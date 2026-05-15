// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SimpleStorage {

    struct Documents {
        string aadhar;
    }

    struct MultiSig {
        address inst;
        address stud;
        Documents documents;
    }

    mapping(address => MultiSig) public wallets;
    address[] public owners;

    constructor() {
        owners.push(msg.sender);
    }

    // Create a new MultiSig wallet by user
    function createNewMultiSigbyUser(address instituteaddress) public {
        MultiSig storage wa = wallets[msg.sender];
        wa.inst = instituteaddress;
        wa.stud = msg.sender;
        
        // Add to owners array if not already there
        bool exists = false;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            owners.push(msg.sender);
        }
    }

    // Upload an Aadhar (string input)
    function uploadAadhar(string memory a) public {
        MultiSig storage wa = wallets[msg.sender];
        wa.documents.aadhar = a;
    }

    // Get owners array
    function getOwners() public view returns (address[] memory) {
        return owners;
    }
    
    // Overloaded getOwners for compatibility
    function getOwners(address) public view returns (address[] memory) {
        return owners;
    }

    // Check if wallet exists for given address
    function doesWalletExists(address wallet) public view returns (bool) {
        return wallets[wallet].stud != address(0);
    }

    // Get user profile - returns default values for compatibility
    function getProfile(address user) public pure returns (string memory, string memory, string memory) {
        // Suppress unused parameter warning
        user;
        return ("Default Name", "default@email.com", "Default Bio");
    }

    // Get Aadhar for specific user
    function getAadhar(address user) public view returns (string memory) {
        return wallets[user].documents.aadhar;
    }

    // Get Aadhar for calling user
    function getAadhar() public view returns (string memory) {
        return wallets[msg.sender].documents.aadhar;
    }

    // Get MultiSig data for user
    function getMultiSig(address user) public view returns (address, address, string memory) {
        MultiSig memory wallet = wallets[user];
        return (wallet.inst, wallet.stud, wallet.documents.aadhar);
    }

    // Basic storage functions for compatibility
    uint256 storedData;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}