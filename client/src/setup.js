import getWeb3 from "./utils/getWeb3";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import { getGenre } from "./services/genre";

export async function setup() {
    try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        const genres = [{ _id: "", name: "All Genres" }, ...getGenre()];
        return {web3, accounts, instance, genres};
        
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract.`,
        );
      }
}
