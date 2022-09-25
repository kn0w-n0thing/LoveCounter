// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract LoveCounter {

    struct Moment {
        uint x;
        uint y;
        string romance;
    }

    mapping(address => Moment[]) public records;

    function addMoment(uint x, uint y, string calldata romance) public {
        Moment[] storage moments = records[msg.sender];
        moments.push(Moment(x, y, romance));
        records[msg.sender] = moments;
    }

    function getMoments() public view returns (Moment[] memory) {
        return records[msg.sender];
    }
}
