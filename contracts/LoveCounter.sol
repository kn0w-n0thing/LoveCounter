// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract LoveCounter {

    mapping(address => uint64[]) public locationMap;
    mapping(uint64 => string) public romanceMap;
    uint64[] public occupiedLocations;

    function addMoment(uint64 location, string calldata romance) public {
        require(bytes(romance).length > 0, "Romance can not be empty!");
        
        require(bytes(romanceMap[location]).length == 0, "Location is occupied!");

        uint64[] storage locations = locationMap[msg.sender];
        locations.push(location);
        locationMap[msg.sender] = locations;
        romanceMap[location] = romance;
        occupiedLocations.push(location);
    }

    function getMyLocations() public view returns (uint64[] memory) {
        return locationMap[msg.sender];
    }

    function getRomance(uint64 location) public view returns (string memory) {
        string memory romance = romanceMap[location];
        require(bytes(romance).length > 0, "No romance!");
        return romanceMap[location];
    }

    function getOccupiedLocations() public view returns (uint64[] memory) {
        return occupiedLocations;
    }
}
