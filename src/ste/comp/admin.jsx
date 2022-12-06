import { useHookstate } from "@afrideva/ui/store/hookstate";
import { metricStore } from "@afrideva/ui/store/metric";
import { authStore } from "@afrideva/ui/store/auth";
import { abi as erc20Abi } from "@afrideva/ui/evm/erc20.json";
import { appStore, anvilAddr, steAbi } from "../store/app";
import { ethers, utils } from "@afrideva/ui/evm/ethers";
import Button from "@afrideva/ui/comp/Button";
import StatusSection from "./status.jsx";
const AdminSection = () => {
  let state = useHookstate(metricStore.state);
  let authState = useHookstate(authStore.state);
  let user = authState.user.get();
  let totalListenDuration = state.totalListenDuration.get();
  let requiredDuration = 100;

  let coin = totalListenDuration / 10000;
  let contra = authStore.providers.wallet.getContract({
    addr: anvilAddr,
    abi: steAbi,
  });
  return (
    <div>
      <h3>
        <strong>Admin:</strong>
      </h3>

      <Button
        onClick={async () => {
          console.log(steAbi);
          // const gasPrice = authStore.providers.wallet.signer.gasPrice();
          const res = await contra.endRound({
            // gasPrice: gasPrice,//
            // // gasPrice: 50,//
            // gasLimit: 250000,
          });
          // const res = await appStore.refresh();
        }}
      >
        End Voting
      </Button>
      <br />
      <hr />
      <Button
        onClick={async () => {
          const res = await appStore.refresh();
        }}
      >
        Refresh
      </Button>
    </div>
  );
};

export default AdminSection;
