import { useHookstate } from "@afrideva/ui/store/hookstate";
import { metricStore } from "@afrideva/ui/store/metric";
import { authStore } from "@afrideva/ui/store/auth";
import { abi as erc20Abi } from "@afrideva/ui/evm/erc20.json";
import { appStore, anvilAddr, steAbi } from "../store/app";
import { ethers, utils } from "@afrideva/ui/evm/ethers";
import Button from "@afrideva/ui/comp/Button";
let roundStatusName
const StatusSection = (props) => {
  let appState = useHookstate(appStore.state);
  let rc = appState.roundConfig.get();
  let roundWinner = "Pending";
  let roundStatus = "Voting round not started";

    switch (Number(rc.status)) {
      case 1:
        roundStatus = "Voting in Progress";
        break;
      case 2:
        roundStatus = "Waiting for randomness from from Chainlink";
        break;

      case 3:
        roundStatus = "Winner Selected";
        break;
      default:
        break;
    }
  if (Number(rc?.status) === 3) {
    roundWinner = rc.tracks[rc.winner].meta.title;
  }
  if (!rc.status) {
    return (
      <div>
        <div className="border shadow rounded-md p-4  w-full mx-auto">
          <div className="animate-pulse  space-x-4">
            <h3>Loading...</h3>
            <div className="h-7 m-1 bg-slate-200 rounded "></div>
            <div className="h-7 m-1 bg-slate-200 rounded "></div>
            <div className="h-7 bg-slate-200 rounded "></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      Round Status: {rc && roundStatus}
      <br />
      Round Winner: {roundWinner}
      <br />
      Your VV balance:{" "}
      {appState.userBalance?.get() &&
        utils.formatUnits(
          ethers.BigNumber.from(appState.userBalance.get()),
          "ether"
        )}
      <hr />
    </div>
  );
};
export default StatusSection;
