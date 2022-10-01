const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20 Basic Token", function() {
    async function deployContract() {
        const [deployer, acc1, acc2] = await ethers.getSigners()

        const ERC20 = await ethers.getContractFactory("ERC20Basic", deployer)

        let erc20 = await ERC20.deploy()

        await erc20.deployed()

        return {ERC20, erc20, deployer, acc1, acc2}
    }

    describe("Checking for compatibility with ERC20 standard", function() {
        it("Should have all default functions", async function() {
            const { erc20 } = await loadFixture(deployContract)

            expect(await erc20.name, "Function 'name' doesn't exist").to.be.a("function")
            expect(await erc20.symbol, "Function 'symbol' doesn't exist").to.be.a("function")
            expect(await erc20.decimals, "Function 'decimals' doesn't exist").to.be.a("function")
            expect(await erc20.totalSupply, "Function 'totalSupply' doesn't exist").to.be.a("function")
            expect(await erc20.transfer, "Function 'transfer' doesn't exist").to.be.a("function")
            expect(await erc20.transferFrom, "Function 'transferFrom' doesn't exist").to.be.a("function")
            expect(await erc20.balanceOf, "Function 'balanceOf' doesn't exist").to.be.a("function")
            expect(await erc20.approve, "Function 'approve' doesn't exist").to.be.a("function")
            expect(await erc20.allowance, "Function 'allowance' doesn't exist").to.be.a("function")
        })
    })

    describe("Testing functions", function(){
        it("Testing 'transfer' function  from deployer", async function() {
            
            const { erc20, deployer, acc1 } = await loadFixture(deployContract)

            expect(await erc20.transfer(acc1.address, 20)).to.changeTokenBalances(erc20, [deployer, acc1], [-20, 20])
        })

        it("Testing 'transferFrom', 'approve' and 'allowance' functions", async function() {
            const { erc20, deployer, acc1, acc2 } = await loadFixture(deployContract)

            await erc20.approve(acc1.address, 20)

            expect(await erc20.allowance(deployer.address, acc1.address)).to.be.equal(20);
            
            expect(await erc20.connect(acc1).transferFrom(deployer.address, acc2.address, 20)).to.changeTokenBalances(erc20, [deployer, acc2], [-20,20])
            
            expect(await erc20.allowance(deployer.address, acc1.address)).to.be.equal(0);
            
        })

        it("Testing 'balanceOf' function", async function() {
            const { erc20, deployer } = await loadFixture(deployContract)

            expect(await erc20.balanceOf(deployer.address)).to.be.equal("1000000000000000000000")
        })
    })

    describe("Testing public variables", function() {
        it("Should return name: 'ERC20 Basic Token'", async function() {
            const { erc20 } = await loadFixture(deployContract)

            expect(await erc20.name()).to.be.equal("ERC20 Basic Token")
        })
        
        it("Should return symbol: 'ERBT'", async function() {
            const { erc20 } = await loadFixture(deployContract)

            expect(await erc20.symbol()).to.be.equal("ERBT")
        })
        
        it("Should return decimals: '18'", async function() {
            const { erc20 } = await loadFixture(deployContract)

            expect(await erc20.decimals()).to.be.equal("18")
        })
        it("Should return total supply: '1000000000000000000000'", async function() {
            const { erc20 } = await loadFixture(deployContract)

            expect(await erc20.totalSupply()).to.be.equal("1000000000000000000000")
        })
    })
})