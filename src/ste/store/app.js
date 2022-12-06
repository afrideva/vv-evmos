import { Store } from "@afrideva/ui/store/Store";
import { authStore } from "@afrideva/ui/store/auth";
import { abi as steAbi } from "../evm/STE.json";
let anvilAddr = "0xA64747268a7F0a4F57ef8808f03F2DC9e6B7c6a1"; //evmos
// let anvilAddr = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
// let anvilAddr = "0xf99ab02fab873a7f598ddf64cd81d4e713b24654";
export { steAbi, anvilAddr };
class SteStore extends Store {
  constructor(props) {
    super(props);
  }
  async getUserTokenBalance() {
    let res;
    let addr = anvilAddr;
    let ste = authStore.providers.wallet.getContract({
      addr,
      abi: steAbi,
    });
    let userAddr = authStore.state.user.account.get();

    // console.log(userAddr);
    let rc = await ste.balanceOf(userAddr[0]);
    res = rc;
    return res;
  }
  async getRoundConfig() {
    let res;
    let addr = anvilAddr;
    let ste = authStore.providers.wallet.getContract({
      addr,
      abi: steAbi,
    });
    let rc = await ste.getRoundConfig();
    res = rc;
    return res;
  }
  async refresh() {
    let res;
    let rc = await this.getRoundConfig();
    let balance = await this.getUserTokenBalance();
    // console.log("balance", balance);
    res = rc;
    let roundId = rc.roundId.toNumber();
    let status = String(rc.status);
    let winner = String(rc.winner);

    rc.tracks.forEach((t, i) => {
      let votes = t.votes.toString();
      this.state.roundConfig.tracks[i].votes.set(votes);
      // console.log("t votes", votes);
    });
    this.state.userBalanceRaw.set(balance);
    this.state.userBalance.set(balance.toString());

    this.state.roundConfig.roundId.set(roundId);
    this.state.roundConfig.status.set(status);
    this.state.roundConfig.winner.set(winner);
  }
}
import cwImgUrl from '../cwaves.png'
import hwImgUrl from '../hwaves.jpg'
import twImgUrl from '../twaves.png'
let initialState = {
  roundConfig: {
    roundId: -1,
    winner: -1,
    tracks: [
      {
        votes: 0,
        artistAddr: "0x3fd",
        tokenAddr: "sds",
        votes: 0,
        meta: {
          imgUrl:cwImgUrl,
          audioUrl:
            "http://soar.cool/cw.mp3",
          artist: "Hurric4n3Ike",
          title: "CreWavez",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
        },
      },
      {
        votes: 0,
        artistAddr: "0x4",
        tokenAddr: "",
        meta: {
          imgUrl:hwImgUrl,
          audioUrl:
            "http://soar.cool/hw.wav.",
          artist: "Hurric4n3Ike",
          title: "Hurric4n3Wavez",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
        },
      },
      {
        votes: 0,
        artistAddr: "0x5",
        tokenAddr: "",
        meta: {
          imgUrl:twImgUrl,
          audioUrl:
            "http://soar.cool/tw.mp4",
          artist: "Hurric4n3Ike",
          title: "TerrorWavez",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
        },
      },
    ],
  },
};
let appStore = new SteStore(initialState);
try {
  appStore.refresh();
} catch (error) {
  console.log(error);
}
setInterval(() => {
  try {
    appStore.refresh();
  } catch (error) {}
}, 5000);
export { appStore };
