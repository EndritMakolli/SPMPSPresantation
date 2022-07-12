import { useStore } from "../Stores/Store";
import "../Style/Settings.css";
import ChooseFaculty from "./ChooseFaculty";
import Switch from "react-switch";
import { observer } from "mobx-react";

export default observer(function Settings() {
  const { currentFaculty, logOut, deselectFaculty } = useStore().userStore;
  const { postsChecked, loading, changePostsEmailSubscription } =
    useStore().userStore.userSettings!;

  const onPostsSwitch = async () => {
    await changePostsEmailSubscription();
  };

  return (
    <>
      {!currentFaculty && <ChooseFaculty />}
      {!loading && currentFaculty && (
        <>
          <h1>Settings</h1>
          <section className="contents" id="settings">
            <div>
              <h2>Rizgjedh fakultetin</h2>
              <div className="row justify-between align-center">
                <span>
                  Rishfaq ndërfaqen për zgjedhjen e fakultetit, sikur në kyçje,
                  nëse doni të ndërroni informatat që shfaqen në sistem.
                </span>
                <button onClick={deselectFaculty}>Rizgjedh fakultetin</button>
              </div>
            </div>
            <div>
              <h2>Çkyçuni nga sistemi</h2>
              <div className="row justify-between align-center">
                <span>
                  Largoheni nga sesioni, dhe për të pasur qasje sërisht në
                  sistem, duhet të kyçeni përsëri. Fakulteti i fundit i
                  përzgjedhur ruhet.
                </span>
                <button onClick={logOut}>Çkyçuni</button>
              </div>
            </div>
            <div>
              <h2>Prano njoftimet në email adresë</h2>
              <div className="row justify-between align-center">
                <span>
                  Njoftimet relevante për ju do të dërgohen në email adresën e
                  fakultetit kur të postohen. Postimet mund të qasen normal edhe
                  nga sistemi.
                </span>
                <label htmlFor="">
                  <Switch
                    onChange={onPostsSwitch}
                    checked={postsChecked!}
                    onColor="#062726"
                    checkedIcon={false}
                    uncheckedIcon={false}
                  />
                </label>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
});
