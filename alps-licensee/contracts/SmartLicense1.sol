pragma solidity >=0.4.22 <0.9.0;

contract SmartLicense1 {
    string public licensee = "Sally Beauty Holdings, Inc.";
    string public licensor = "Other Specialty Stores";
    string public devices = "150";
    string public startDate = "10/08/2021";

    function setLicensee(string memory x) public {
        licensee = x;
    }

    function setLicensor(string memory x) public {
        licensor = x;
    }

    function setDevices(string memory x) public {
        devices = x;
    }

    function setStartDate(string memory x) public {
        startDate = x;
    }
}
