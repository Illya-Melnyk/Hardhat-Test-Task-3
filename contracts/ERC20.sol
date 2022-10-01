//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;


contract ERC20Basic {
    string public _name = "ERC20 Basic Token";
    string public _symbol = "ERBT";
    uint256 public _decimals = 18;

    uint256 public _totalSupply = 1000 ether;

    address public owner;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor() {
        balances[msg.sender] = _totalSupply;
        owner = msg.sender;
    }

    function name() external view returns(string memory) {
        return _name;
    }

    function symbol() external view returns(string memory) {
        return _symbol;
    }

    function decimals() external view returns(uint256) {
        return _decimals;
    }

    function totalSupply() external view returns(uint256) {
        return _totalSupply;
    }

    function allowance(address _owner, address _spender) external view returns(uint256){
        return allowances[_owner][_spender];
    }

    function approve(address _spender, uint256 _amount) external{
        allowances[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
    require(value <= balances[from]);
    require(value <= allowances[from][msg.sender]);
    require(to != address(0));

    balances[from] = balances[from] - value;
    balances[to] = balances[to] + value;
    allowances[from][msg.sender] = allowances[from][msg.sender] - value;
    emit Transfer(from, to, value);
    return true;
  }
}