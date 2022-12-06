import { useHookstate } from "@afrideva/ui/store/hookstate";
import { authStore } from "@afrideva/ui/store/auth";
import { appStore, anvilAddr, steAbi } from "../store/app";
import { ethers, utils } from "@afrideva/ui/evm/ethers";
import { useState } from "react";
import Button from "@afrideva/ui/comp/Button";
import { toast } from "@afrideva/ui/comp/toast/index";
const ClaimSection = (props) => {
  let { trackIndex,currentVotes } = props;
  let appState = useHookstate(appStore.state);
  let rc = appState.roundConfig.get();
// let currentVotesSection = 
//   if(rc.status !== 1 ){
// currentVotesSection = ""
//   }
  //
  let [voteAmt, setVoteAmt] = useState(0);
  // console.log(rc,'!!!!')
  switch (Number(rc.status)) {
    case 0:
      return "" 
      // return "voting not init" 
      break;
    case 1:
      // return "voting not init" 
      break;
    case 2:
      return "voting complete,selecting winner" 
      break;
    case 3:
      return <strong>{currentVotes} Votes</strong> 
      break;

    default:
      return ""
      break;
  }
  return (
    <span>

    <input
      style={{ width: "70px" }}
      value={voteAmt}
      placeholder="Amount"
      type="number"
      onChange={(e) => {
        //toast if more than available
        setVoteAmt(e.target.value);
      }}
    />
    <Button
      onClick={async () => {
        let weiBalance =appState.userBalanceRaw.get()  
        let weiVotes = utils.parseUnits(voteAmt.toString(), "ether");
        // let weiBalance = utils.parseUnits(userBalance.toString(), "ether");
        console.log(voteAmt,weiVotes,weiBalance,weiBalance.lt(weiVotes),'!!!')
        if(voteAmt<=0){
          toast("Select a number of VV tokens greater than 0 that you'd like to vote with")
          return
        }
        if(weiBalance.lt(weiVotes)){
          toast("Not enough tokens for vote. Stream tracks to earn more or choose a lower amount")
          return
        }
        let addr = anvilAddr;
        console.log(steAbi);
        let contra = authStore.providers.wallet.getContract({
          addr,
          abi: steAbi,
        });
        let trackId = trackIndex;

        let voteOpts = [
          trackId,
          weiVotes
        ];
        console.log(voteOpts);
        let res = await contra.vote(
          ...voteOpts,
        );
      }}
    >
      Vote ({currentVotes} Current Votes)
    </Button>
    </span>
  );
};

export default ClaimSection;
