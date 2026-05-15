import React, { Component } from "react";
import { Grid, Typography, Avatar, Card, Button } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import AssignmentIcon from "@material-ui/icons/Assignment";
import green from "@material-ui/core/colors/green";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ipfs from "../ipfs";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class MyDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      aadhar: "",
      hasAadhar: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.saveToIpfs(Buffer(reader.result));
    };
  };

  saveToIpfs = async buffer => {
    await ipfs.add(buffer, (err, ipfsHash) => {
      if (err) {
        console.error("IPFS error:", err);
        return;
      }
      console.log("IPFS hash:", ipfsHash[0].hash);
      this.setState({ aadhar: ipfsHash[0].hash });
    });
  };

  uploadDocument = async () => {
    const { accounts, contract } = this.props;
    try {
      // store hash in contract
      await contract.methods
        .uploadAadhar(this.state.aadhar)
        .send({ from: accounts[0] });

      const response = await contract.methods.getAadhar(accounts[0]).call();
      this.setState({ aadhar: response, hasAadhar: !!response });
      console.log("Document uploaded:", response);
    } catch (err) {
      console.error("Error uploading document:", err);
    }

    this.handleClose();
  };

  getDoc = async () => {
    const { accounts, contract } = this.props;
    try {
      const r = await contract.methods.getAadhar(accounts[0]).call();
      if (r && r.length > 0) {
        window.open(`https://gateway.ipfs.io/ipfs/${r}`);
      } else {
        window.alert("No document found");
      }
    } catch (err) {
      console.error("Error fetching document:", err);
    }
  };

  componentDidMount = async () => {
    const { accounts, contract } = this.props;
    try {
      const r = await contract.methods.getAadhar(accounts[0]).call();
      if (r && r.length > 0) {
        this.setState({ hasAadhar: true, aadhar: r });
      }
    } catch (err) {
      console.error("Error on mount:", err);
    }
  };

  render() {
    return (
      <div>
        <Grid container>
          <Grid item md={1} />
          <Grid item md={5}>
            <Card
              style={{
                marginTop: "30px",
                marginLeft: "50px",
                marginRight: "50px",
                width: "800px"
              }}
            >
              <Grid container>
                <Grid item md={1}>
                  <Avatar
                    style={{ margin: "15px", backgroundColor: "#3F51B5" }}
                  >
                    <FolderIcon />
                  </Avatar>
                </Grid>
                <Grid item md={10}>
                  <Typography
                    variant="h4"
                    style={{
                      padding: "10px",
                      marginLeft: "15px",
                      color: "#3F51B5"
                    }}
                  >
                    My Documents
                    <Typography variant="caption" style={{ marginLeft: "5px" }}>
                      (Click on the Document name to view.)
                    </Typography>
                  </Typography>
                </Grid>

                {this.state.hasAadhar ? (
                  <ExpansionPanel style={{ width: "800px" }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Avatar
                        style={{
                          color: "#fff",
                          backgroundColor: green[500]
                        }}
                      >
                        <AssignmentIcon />
                      </Avatar>
                      <Typography style={{ margin: "10px" }}>
                        Uploaded Document
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Grid container>
                        <Grid item md={10}>
                          <Typography>
                            <em>Document hash:</em> {this.state.aadhar}
                          </Typography>
                        </Grid>
                        <Grid item md={1}>
                          <Button
                            variant="outlined"
                            style={{ color: "green", marginLeft: "0px" }}
                            onClick={this.getDoc}
                          >
                            View
                          </Button>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ) : null}

                <Grid container justify="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginTop: "15px", marginBottom: "15px" }}
                    onClick={this.handleClickOpen}
                  >
                    Add New Document
                  </Button>

                  <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      <Typography style={{ color: "#1a237e" }} variant="h4">
                        Add New Document
                      </Typography>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>Upload Document</DialogContentText>

                      <Button>
                        <input onChange={this.captureFile} type="file" />
                      </Button>
                    </DialogContent>
                    <DialogContent>
                      {this.state.aadhar && (
                        <Grid container justify="center">
                          <img
                            src={`https://gateway.ipfs.io/ipfs/${this.state.aadhar}`}
                            alt="Your Uploaded Docs"
                            style={{
                              margin: "20px",
                              height: "250px",
                              width: "250px"
                            }}
                          />
                        </Grid>
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={this.uploadDocument} color="primary">
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MyDocuments;
