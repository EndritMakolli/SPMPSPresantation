import "../Style/PersonalProfile.css";
import { DataField } from "../Components/Common/DataField";
import { useStore } from "../Stores/Store";

export const PersonalProfile = () => {
  const { user } = useStore().userStore;
  return (
    <>
      <h1 id="title">Profili personal</h1>
      <section className="contents" id="personalProfile">
        <div className="personalProfileBlock">
          <DataField
            label="Emri dhe mbiemri"
            contents={user?.firstName + " - " + user?.lastName}
          />
          <DataField label="Emri i prindit" contents={user!.parentName} />
          <DataField label="Ditëlindja" contents={user!.birthday} />
          <DataField label="Mosha" contents={user!.age} />
          <DataField
            label="Numri i letërnjoftimit"
            contents={user!.personalNumber}
          />
          <DataField label="Email adresa" contents={user!.email} />
          <DataField label="Gjinia" contents={user!.gender} />
        </div>

        <div className="personalProfileBlock">
          <img src={user!.profilePictureUrl} alt="Fotoja e juaj" />
        </div>

        <div className="personalProfileBlock">
          <DataField label="Numri i telefonit" contents={user!.telephone} />
          <DataField label="Shteti" contents={user!.country} />
          <DataField label="Qyteti" contents={user!.city} />
          <DataField label="Adresa" contents={user!.address} />
          <DataField label="ZIP Kodi" contents={user!.zipCode} />
        </div>
      </section>
    </>
  );
};
