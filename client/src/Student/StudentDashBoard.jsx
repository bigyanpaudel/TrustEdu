import React, { Component } from "react";
import {
  Grid,
  Card,
  Typography,
  Avatar,
  Button,
  ListItemAvatar
} from "@material-ui/core";
import {
  Route,
  Link,
  Switch,
  BrowserRouter
} from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TopNav from "./TopNav";
import FolderIcon from "@material-ui/icons/Folder";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Paper from "@material-ui/core/Paper";

import MyDocuments from "./MyDocuments";
import PendingApproval from "./PendingApproval";
import MyRequest from "./MyRequest";
import ChangeInst from "./ChangeInst";
import ApproveChnageInst from "./ApproveChangeInst";
import ApproveAccessReq from "./ApproveAccessReq";
import GiveAccessTo from "./GiveAccessTo";
import FreeAccess from "./FreeAccess";
import PastHistory from "./PastHistory";

class StudentDashBoard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    open: false,
    profilepic: "",
    name: "",
    owner1: "",
    owner2: "",
    aadhar: ""
  };

  profile = async () => {
    try {
      const { accounts, contract } = this.props;

      // getOwners returns an array of addresses
      const response = await contract.methods.getOwners().call();
      this.setState({
        owner1: response[0] || "",
        owner2: response[1] || ""
      });

      const response1 = await contract.methods.getProfile(accounts[0]).call();
      this.setState({
        name: response1[0] || "",
        profilepic: response1[1] || ""
      });

      const response3 = await contract.methods.getAadhar(accounts[0]).call();
      this.setState({ aadhar: response3 || "" });
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  componentDidMount = async () => {
    await this.profile();
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Grid container justify="flex-start">
            <Grid item md={12}>
              <TopNav
                accounts={this.props.accounts}
                contract={this.props.contract}
              />
            </Grid>

            <Grid item md={12} style={{ padding: "40px" }} />

            {/* Left side profile panel */}
            <Grid
              item
              md={2}
              style={{
                height: "100vh",
                zIndex: "1"
              }}
            >
              <Card
                style={{
                  width: "300px",
                  height: "100%",
                  paddingTop: "10px"
                }}
              >
                <Grid item md={12}>
                  <Typography
                    variant="h4"
                    style={{
                      padding: "20px",
                      color: "#3F51B5",
                      textAlign: "center"
                    }}
                  >
                    My Profile
                  </Typography>

                  <Grid container>
                    <Grid item md={12}>
                      <Avatar
                        style={{
                          width: 80,
                          height: 80,
                          marginLeft: "33.33%"
                        }}
                        src={
                          this.state.profilepic
                            ? `https://gateway.ipfs.io/ipfs/${this.state.profilepic}`
                            : ""
                        }
                      />
                      <br />
                    </Grid>
                    <Grid item md={12}>
                      <Typography variant="h5" style={{ textAlign: "center" }}>
                        {this.state.name || "Loading..."}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        style={{ textAlign: "center" }}
                      >
                        My Address :<br />
                        {this.state.owner1
                          ? this.state.owner1.substring(0, 8) + ".."
                          : "N/A"}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        style={{ textAlign: "center" }}
                      >
                        Current Institute/Organization :{" "}
                        {this.state.owner2
                          ? this.state.owner2.substring(0, 8) + ".."
                          : "N/A"}
                      </Typography>
                    </Grid>

                    <Grid container justify="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        style={{ marginTop: "25px" }}
                      >
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to="/MyProfileStud"
                        >
                          View Profile
                        </Link>
                      </Button>
                    </Grid>
                  </Grid>

                  <List style={{ textAlign: "center" }}>
                    <ListItem
                      button
                      style={{ width: "300px", color: "#3F51B5" }}
                    >
                      <ListItemAvatar>
                        <FolderIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Link style={{ textDecoration: "none" }} to="/mydocs">
                          <Typography variant="h6">My Documents</Typography>
                        </Link>
                      </ListItemText>
                    </ListItem>

                    <ListItem
                      button
                      style={{ width: "300px", color: "#3F51B5" }}
                    >
                      <ListItemAvatar>
                        <FolderIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Link
                          style={{ textDecoration: "none" }}
                          to="/giveaccess"
                        >
                          <Typography variant="h6">Give Access</Typography>
                        </Link>
                      </ListItemText>
                    </ListItem>

                    <ListItem
                      button
                      style={{ width: "300px", color: "#3F51B5" }}
                    >
                      <ListItemAvatar>
                        <AssignmentIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Link
                          to="/FreeAccess"
                          style={{ textDecoration: "none" }}
                        >
                          <Typography variant="h6">Free Access</Typography>
                        </Link>
                      </ListItemText>
                    </ListItem>

                    <ListItem
                      button
                      style={{ width: "300px", color: "#3F51B5" }}
                    >
                      <ListItemAvatar>
                        <FolderIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Link
                          style={{ textDecoration: "none" }}
                          to="/chinst"
                        >
                          <Typography variant="h6">
                            Change Institute
                          </Typography>
                        </Link>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Grid>
              </Card>
            </Grid>

            {/* Middle content area */}
            <Grid item md={7} style={{ paddingTop: "70px" }}>
              <Switch>
                <Route
                  path="/pendapp"
                  component={() => (
                    <PendingApproval
                      accounts={this.props.accounts}
                      contract={this.props.contract}
                    />
                  )}
                />
                <Route
                  path="/approveaccessreq"
                  component={() => (
                    <ApproveAccessReq
                      accounts={this.props.accounts}
                      contract={this.props.contract}
                    />
                  )}
                />
                <Route
                  path="/FreeAccess"
                  component={() => (
                    <FreeAccess
                      accounts={this.props.accounts}
                      contract={this.props.contract}
                    />
                  )}
                />
                <Route
                  path="/giveaccess"
                  component={() => (
                    <GiveAccessTo
                      accounts={this.props.accounts}
                      contract={this.props.contract}
                    />
                  )}
                />
                <Route
                  path="/approvechnageininst"
                  component={() => (
                    <ApproveChnageInst
                      accounts={this.props.accounts}
                      contract={this.props.contract}
                    />
                  )}
                />
                <Route
                  path="/myreqs"
                  component={() => (
                    <MyRequest
                      accounts={this.props.accounts}
                      contract={this.props.contract}
                    />
                  )}
                />
                <Route
                  path="/pasthistory"
                  component={() => (
                    <PastHistory
                      accounts={this.props.accounts}
                      contract={this.props.contract}
                    />
                  )}
                />
                <Route
                  path="/chinst"
                  component={() => (
                    <ChangeInst
                      accounts={this.props.accounts}
                      contract={this.props.contract}
                    />
                  )}
                />
                <Route
                  path="/mydocs"
                  component={() => (
                    <MyDocuments
                      accounts={this.props.accounts}
                      contract={this.props.contract}
                    />
                  )}
                />
              </Switch>
            </Grid>

            {/* Right side notifications */}
            <Grid item md={3} style={{ padding: "15px" }}>
              <Card style={{ margin: "15px" }}>
                <Typography
                  variant="h4"
                  style={{ padding: "10px", color: "#3F51B5" }}
                >
                  Notifications
                  <Typography variant="caption" style={{ marginLeft: "5px" }}>
                    (Click on the Notification to view.)
                  </Typography>
                </Typography>
                <List>
                  {/* Future notifications mapping */}
                </List>
              </Card>
            </Grid>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

export default StudentDashBoard;
