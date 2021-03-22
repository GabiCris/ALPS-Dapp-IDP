pragma solidity >=0.4.22 <0.9.0;

contract SmartLicense3 {
    string public licensee = "CalAmp Corp.";
    string public licensor = "Radio And Television Broadcasting And Communications Equipment";
    string public devices = "320";
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
