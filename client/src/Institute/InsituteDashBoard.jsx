import React, { Component } from "react";
import {
  Grid,
  Card,
  Typography,
  Avatar,
  Button,
  ListItemAvatar,
} from "@material-ui/core";
import {
  Route,
  Link,
  Switch,
  BrowserRouter,
} from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import TopNav from "../Student/TopNav";
import FolderIcon from "@material-ui/icons/Folder";
import MailIcon from "@material-ui/icons/Mail";
import AssignmentIcon from "@material-ui/icons/Assignment";

import ChangeOwnershipApprovalbyInst from "./ChangeOwnershipApprovalbyInst";
import ApproveUpload from "./ApproveUpload";
import LinkedAccount from "./LinkedAccounts";
import RequestAccess from "./RequestAccess";
import Access from "./Access";
import OtpAccess from "./OtpAccess";

class InstituteDashBoard extends Component {
  state = {
    open: false,
    profilepic: "",
    name: "",
    owner1: "",
    owner2: "",
    aadhar: "",
  };

  profile = async () => {
    try {
      const { accounts, contract } = this.props;

      // getOwners() returns an array; guard for length
      const owners = await contract.methods.getOwners().call();
      this.setState({
        owner1: owners[0] || "",
        owner2: owners[1] || "",
      });

      // profile for current account
      const prof = await contract.methods.getProfile(accounts[0]).call();
      this.setState({
        name: (prof && prof[0]) || "",
        profilepic: (prof && prof[1]) || "",
      });

      // stored doc hash (if any)
      const aad = await contract.methods.getAadhar(accounts[0]).call();
      this.setState({ aadhar: aad || "" });
    } catch (e) {
      console.error("InstituteDashBoard.profile error:", e);
    }
  };

  componentDidMount = async () => {
    await this.profile();
    // NOTE: Removed calls to getInstitutesWallet / getInstitutesUploadList
    // because they do not exist in your current SimpleStorage.sol
  };

  render() {
    const { accounts, contract } = this.props;
    const { profilepic, name, owner1 } = this.state;

    return (
      <BrowserRouter>
        <div>
          <Grid container>
            {/* Top Nav */}
            <Grid item md={12}>
              <TopNav accounts={accounts} contract={contract} />
            </Grid>

            <Grid item md={12} style={{ padding: "40px" }} />

            {/* Left: Institute Profile + Nav */}
            <Grid item md={3} style={{ padding: "15px" }}>
              <Card style={{ width: 300, minHeight: 600 }}>
                <Grid item md={12}>
                  <Typography
                    variant="h4"
                    style={{ padding: "20px", color: "#3F51B5" }}
                  >
                    Institute Profile
                  </Typography>

                  <Grid container>
                    <Grid item md={12}>
                      <Avatar
                        style={{
                          width: 80,
                          height: 80,
                          marginLeft: "33.33%",
                        }}
                        src={
                          profilepic
                            ? `https://gateway.ipfs.io/ipfs/${profilepic}`
                            : ""
                        }
                      />
                      <br />
                    </Grid>

                    <Grid item md={12}>
                      <Typography variant="h5" style={{ textAlign: "center" }}>
                        {name || "Loading..."}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        style={{ textAlign: "center" }}
                      >
                        My Address :
                        <br />
                        {accounts &&
                        accounts[0] &&
                        typeof accounts[0] === "string"
                          ? accounts[0].substring(0, 8) + ".."
                          : "N/A"}
                      </Typography>

                      {/* If you want to show the first owner (from getOwners) */}
                      {owner1 ? (
                        <Typography
                          variant="caption"
                          style={{ display: "block", textAlign: "center" }}
                        >
                          Owner #1: {owner1.substring(0, 8) + ".."}
                        </Typography>
                      ) : null}
                    </Grid>

                    <Grid container justify="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        style={{ marginTop: 25 }}
                      >
                        <a
                          href="/MyProfileInst"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          View Profile
                        </a>
                      </Button>
                    </Grid>
                  </Grid>

                  {/* Navigation List */}
                  <List style={{ textAlign: "center" }}>
                    <ListItem button style={{ width: 300, color: "#3F51B5" }}>
                      <ListItemAvatar>
                        <FolderIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography variant="h6">
                          <Link
                            to="/InstituteDashBoard/k"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Linked Accounts
                          </Link>
                        </Typography>
                      </ListItemText>
                    </ListItem>

                    <ListItem button style={{ width: 300, color: "#3F51B5" }}>
                      <ListItemAvatar>
                        <FolderIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography variant="h6">
                          <Link
                            to="/InstituteDashBoard/acc"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Access Rights
                          </Link>
                        </Typography>
                      </ListItemText>
                    </ListItem>

                    <ListItem button style={{ width: 300, color: "#3F51B5" }}>
                      <ListItemAvatar>
                        <AssignmentIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Link
                          to="/InstituteDashBoard/UploadApp"
                          style={{ textDecoration: "none" }}
                        >
                          <Typography variant="h6">Pending Approvals</Typography>
                        </Link>
                      </ListItemText>
                    </ListItem>

                    <ListItem button style={{ width: 300, color: "#3F51B5" }}>
                      <ListItemAvatar>
                        <AssignmentIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Link
                          to="/InstituteDashBoard/ChangeOwnershipApprovalbyInst"
                          style={{ textDecoration: "none" }}
                        >
                          <Typography variant="h6">
                            Change Institute Approvals
                          </Typography>
                        </Link>
                      </ListItemText>
                    </ListItem>

                    {/* Uncomment if you actually use these routes/components */}
                    {/*
                    <ListItem button style={{ width: 300, color: "#3F51B5" }}>
                      <ListItemAvatar>
                        <AssignmentIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Link
                          to="/InstituteDashBoard/OtpAccess"
                          style={{ textDecoration: "none" }}
                        >
                          <Typography variant="h6">Otp Access</Typography>
                        </Link>
                      </ListItemText>
                    </ListItem>

                    <ListItem button style={{ width: 300, color: "#3F51B5" }}>
                      <ListItemAvatar>
                        <MailIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <Link
                          to="/InstituteDashBoard/ReqAccess"
                          style={{ textDecoration: "none" }}
                        >
                          <Typography variant="h6">Request Access</Typography>
                        </Link>
                      </ListItemText>
                    </ListItem>
                    */}
                  </List>
                </Grid>
              </Card>
            </Grid>

            {/* Middle: Routed content */}
            <Grid item md={5} style={{ padding: "15px" }}>
              <Switch>
                <Route
                  path="/InstituteDashBoard/ChangeOwnershipApprovalbyInst"
                  component={() => (
                    <ChangeOwnershipApprovalbyInst
                      accounts={accounts}
                      contract={contract}
                    />
                  )}
                />

                <Route
                  path="/InstituteDashBoard/OtpAccess"
                  component={() => (
                    <OtpAccess accounts={accounts} contract={contract} />
                  )}
                />

                <Route
                  path="/InstituteDashBoard/k"
                  component={() => (
                    <LinkedAccount accounts={accounts} contract={contract} />
                  )}
                />
                <Route
                  path="/InstituteDashBoard/acc"
                  component={() => (
                    <Access accounts={accounts} contract={contract} />
                  )}
                />
                <Route
                  path="/InstituteDashBoard/UploadApp"
                  component={() => (
                    <ApproveUpload accounts={accounts} contract={contract} />
                  )}
                />
                <Route
                  path="/InstituteDashBoard/ReqAccess"
                  component={() => (
                    <RequestAccess accounts={accounts} contract={contract} />
                  )}
                />
              </Switch>
            </Grid>

            {/* Right spacer */}
            <Grid item md={3} style={{ padding: "15px" }} />
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

export default InstituteDashBoard;
