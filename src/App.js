import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Main from "./pages/Main";
import GroupExhibition from "./pages/GroupExhibition";
import PerGroup from "./pages/PerGroup";
import PersonalExhibition from "./pages/PersonalExhibition";
import Art from "./pages/Art";
import AboutArt from "./pages/AboutArt";
import Diary from "./pages/Diary";
import PerDiary from "./pages/PerDiary";
import UploadDiary from "./pages/UploadDiary";
import UpdateDiary from "./pages/UpdateDiary";
import Chat from "./pages/Chat";
import Community from "./pages/Community";
import PerCommunity from "./pages/PerCommunity";
import UploadCommunity from "./pages/UploadCommunity";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import KakaoLogin from "./pages/KakaoLogin";
import FindPW from "./pages/FindPW";
import SignUp from "./pages/SignUp";
import Layout_Mypage from "./Layout_Mypage";
import MyInformation from "./pages/MyInformation";
import UpdateMyInformation from "./pages/UpdateMyInformation";
import MyProject from "./pages/MyProject";
import UploadMyProject from "./pages/UploadMyProject";
import UpdateMyProject from "./pages/UpdateMyProject";
import AboutMyProject from "./pages/AboutMyProject";
import UpdateCommunity from "./pages/UpdateCommunity";
import MyInvitation from "./pages/MyInvitation";
import PerMyInvitation from "./pages/PerMyInvitation";
import MyGroup from "./pages/MyGroup";
import MyGroupInvited from "./pages/MyGroupInvited";
import UploadMyGroup from "./pages/UploadMyGroup";
import AboutMyGroup from "./pages/AboutMyGroup";
import UpdateMyGroup from "./pages/UpdateMyGroup";
import UploadMyGroupProject from "./pages/UploadMyGroupProject";

//import Test from "./pages/test";

const App = () => {
  return (
    <Routes>
      <Route path="/kakaologin" element={<KakaoLogin />} />
      <Route element={<Layout />}>
        <Route index element={<Main />} />
        {/*<Route path="/test" element={<Test />} />*/}
        <Route path="/groups" element={<GroupExhibition />} />
        <Route path="/groups/:groupName/:groupId" element={<PerGroup />} />
        <Route path="/arts" element={<PersonalExhibition />} />
        <Route path="/arts/:exhibitName/:exhibitId" element={<Art />} />
        <Route
          path="/arts/:exhibitName/:exhibitId/aboutart"
          element={<AboutArt />}
        />
        <Route path="/arts/:exhibitName/:exhibitId/diary" element={<Diary />} />
        <Route
          path="/arts/:exhibitName/:exhibitId/diary/:diaryId"
          element={<PerDiary />}
        />
        <Route
          path="/arts/:exhibitName/:exhibitId/diary/upload"
          element={<UploadDiary />}
        />
        <Route
          path="/arts/:exhibitName/:exhibitId/diary/:diaryId/update"
          element={<UpdateDiary />}
        />
        <Route
          path="/arts/:exhibitName/:exhibitId/:artist/:me/chat"
          element={<Chat />}
        />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:postId" element={<PerCommunity />} />
        <Route path="/community/upload" element={<UploadCommunity />} />
        <Route path="/community/:postId/update" element={<UpdateCommunity />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findPW" element={<FindPW />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route element={<Layout_Mypage />}>
        <Route path="/mypage/myinformation" element={<MyInformation />} />
        <Route
          path="/mypage/myinformation/update"
          element={<UpdateMyInformation />}
        />
        <Route path="/mypage/myproject" element={<MyProject />} />
        <Route
          path="/mypage/myproject/:exhibitId"
          element={<AboutMyProject />}
        />
        <Route path="/mypage/myproject/upload" element={<UploadMyProject />} />
        <Route
          path="/mypage/myproject/:exhibitId/update"
          element={<UpdateMyProject />}
        />
        <Route path="/mypage/myinvitation" element={<MyInvitation />} />
        <Route path="/mypage/myinvitation/:id" element={<PerMyInvitation />} />

        <Route path="/mypage/mygroup" element={<MyGroup />} />
        <Route path="/mypage/mygroup/invited" element={<MyGroupInvited />} />
        <Route path="/mypage/mygroup/:groupId" element={<AboutMyGroup />} />
        <Route path="/mypage/mygroup/upload" element={<UploadMyGroup />} />
        <Route
          path="/mypage/mygroup/:groupId/update"
          element={<UpdateMyGroup />}
        />
        <Route
          path="/mypage/mygroup/:groupId/upload"
          element={<UploadMyGroupProject />}
        />
      </Route>
    </Routes>
  );
};

//
export default App;
