const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", accounts => {
  const amount = 12000000000000000000;

  // it("Adding song.", async () => {
  //   const simpleStorageInstance = await SimpleStorage.deployed();
  //   const event = await simpleStorageInstance.addSong("My Song",10**16, "date", "url","Patapaa",1,{from: accounts[0]});
  //   const songs = await simpleStorageInstance.getSongs.call();
  //   console.log("songs", songs[0]);
  //   expect(songs.length).to.equal(1);
  // });

  it("Event", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();
    const event = simpleStorageInstance.SongAdded.call();
    console.log(event);
  })

  
  // it("Download successful", async() => {
  //   const simpleStorageInstance = await SimpleStorage.deployed();
  //   const songs = await simpleStorageInstance.getSongs.call();
  //   const event = await simpleStorageInstance.downloadSong(songs[0],{from: accounts[2],value:amount});
  // });
});
