import AudioPlayer from "@afrideva/ui/comp/AudioPlayer";
import VideoBg from "@afrideva/ui/comp/VideoBg";
import GlobalPlaybar from "@afrideva/ui/comp/GlobalPlaybar";
import Button from "@afrideva/ui/comp/Button";
import Modal from "@afrideva/ui/comp/Modal";
import { useHookstate } from "@afrideva/ui/store/hookstate";
import { authStore } from "@afrideva/ui/store/auth";
import { globalAudioStore } from "@afrideva/ui/store/globalAudio";
import { appStore } from "../store/app";
import ClaimSection from "../comp/claim.jsx";
import AdminSection from "../comp/admin.jsx";
import Vote from "../comp/vote.jsx";
import { useState } from "react";
import { ethers, utils } from "@afrideva/ui/evm/ethers";
import { toast } from "@afrideva/ui/comp/toast/index";
const RoundTrack = (props) => {
  // console.log(props);

  let authState = useHookstate(authStore.state);
  let appState = useHookstate(appStore.state);
  let rc = appState.roundConfig.get();
  let user = authState.user.get();
  let { meta, votes, trackIndex } = props;
  let { artist, title, description, audioUrl } = meta;
  let [voteAmt, setVoteAmt] = useState(0);
  let voteSection = rc.status ? (
    <span>
      (Votes:{utils.formatUnits(ethers.BigNumber.from(String(votes)), "ether")}
      ))
    </span>
  ) : (
    ""
  );
  return (
    <div>
      <strong>
        {" "}
        {artist} - {title}
        {voteSection}
      </strong>
      <AudioPlayer audioUrl={audioUrl} />
      {user && (
        <div>
          Amount:
          <input
            style={{ width: "50px" }}
            value={voteAmt}
            type="number"
            onChange={(e) => {
              setVoteAmt(e.target.value);
            }}
          />
          <Vote trackIndex={trackIndex} amt={voteAmt} />
        </div>
      )}
    </div>
  );
};
// export function GlobalAudioPlayer({ tracks }) {
//  return <div>
//     </div>
// }
//
export const AudioCell = (props) => {
  let state = globalAudioStore.use();
  // let value = row[column.key];
  // let audioUrl = value;
  let { meta, votes, trackIndex } = props;
  let { artist, title, description, audioUrl } = meta;
  // if (!value) return "x";
  // if (value.includes("ipfs://")) {
  //   let cid = String(value).replace("ipfs://", "");
  //   audioUrl = `https://ipfs.io/ipfs/${cid}`;
  // }
  let currentUrl = state.audioLists[0].musicSrc.get();
  let isCurrent = currentUrl === audioUrl;
  let isPaused = state.paused.get();
  let btnWrapperStyle = {
    margin: "6px auto",
    width: 25,
  };
  let playIconStyle = {
    display: "inline-block",
    width: "2em",
    height: "2em",
  };
  let currentIcon =
    isCurrent && !isPaused ? (
      <svg
        style={playIconStyle}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M15 16h-2V8h2m-4 8H9V8h2m1-6A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2z"
          fill="currentColor"
        ></path>
      </svg>
    ) : (
      // <PauseCircleOutlineIcon />
      // 'play'
      <svg
        style={playIconStyle}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M10 16.5v-9l6 4.5M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2z"
          fill="currentColor"
        ></path>
      </svg>
      // <PlayCircleOutlineIcon />
    );
  // {/* {" "}
  // {isCurrent && "cur:"}
  // {isPaused  && "pau "}
  let player = (
    <span
      style={btnWrapperStyle}
      onClick={() => {
        console.log("cur/paus", isCurrent, isPaused);
        // let src = 'https://www.arweave.net/rumrLbwG9Tkihw78d5Cne-ZIwrwLqEkF7gTc1uEfqZA?ext=mp3'
        if (isCurrent && !isPaused) {
          console.log("setting pausd");
          state.paused.set(true);
          return;
        }
        let src = audioUrl;
        state.autoPlayAfterSrcChange.set(true);
        state.audioLists[0].musicSrc.set(src);
        state.paused.set(false);
        // alert('t')
      }}
    >
      {currentIcon}
    </span>
  );
  // <a href={audioUrl}>{audioUrl}</a>
  return <>{player}</>;
};
import { ReactComponent as ArrowUpIcon } from "@afrideva/ui/icons/fa/arrow-up.svg";
export function TrackListItemVotes(props) {
  let authState = useHookstate(authStore.state);
  let appState = useHookstate(appStore.state);
  let rc = appState.roundConfig.get();
  let user = authState.user.get();
  let { meta, votes, trackIndex } = props;
  let { artist, title, description, audioUrl } = meta;
  // let voteSection = rc.status ? (
  //   <span>
  //     (Votes:{utils.formatUnits(ethers.BigNumber.from(String(votes)), "ether")}
  //     ))
  //   </span>
  // ) : (
  //   ""
  // );
    // <ArrowUpIcon style={{ display: "inline-block", width: 30, height: 30 }} />
  return(

  <span>
    <Vote trackIndex={trackIndex} currentVotes={utils.formatUnits(ethers.BigNumber.from(String(votes)), "ether")}/>
  </span>)
}
export function TrackListItem(props) {
  let authState = useHookstate(authStore.state);
  let appState = useHookstate(appStore.state);
  let rc = appState.roundConfig.get();
  let user = authState.user.get();
  let { meta, votes, trackIndex } = props;
  let { imgUrl,artist, title, description, audioUrl } = meta;
  // let [voteAmt, setVoteAmt] = useState(0);
  
  return (
    <div className="p-4">
      <img style={{height:150,width:150,margin:'auto'}} src={imgUrl} alt=""/>
      <AudioCell {...props} />
      <strong>
        {" "}
        {artist} - {title}
      </strong>
  <div className=" ">

      {user && <TrackListItemVotes {...props} />}
  </div>
  </div>
  );
}
// <RoundTrack key={t.artistAddr} {...t} trackIndex={i} />
export function TrackList({ tracks }) {
  let trackComps;
  trackComps = tracks?.map((t, i) => {
    return (
      <div  key={t.artistAddr}>
        <TrackListItem key={t.artistAddr} {...t} trackIndex={i} />

        <hr />
      </div>
    );
  });
  return <div>{trackComps}</div>;
}
export default function Home() {
  let authState = useHookstate(authStore.state);
  let user = authState.user.get();
  let appState = useHookstate(appStore.state);
  let rc = appState.roundConfig.get();
  let styles = {};
  // <VideoBg />
  return (
    <div className={"text-center bg-white/75 "}>
      <GlobalPlaybar />
      <main className="">
        {user ? (
          <ClaimSection />
        ) : (
          <Button
            onClick={async () => {
              // return
              let opts = {
                method: "wallet",
                data: {},
              };
              const res = await authStore.signIn(opts);
              toast("Login Successful, Welcome to Vibez Voting");
              appStore.refresh();
            }}
          >
            Connect Wallet
          </Button>
        )}
        <hr />
        <TrackList tracks={rc.tracks} />
        {rc.status && <AdminSection />}
      </main>
    </div>
  );
}
// {rc.status ? trackComps : <StatusSection/>}
