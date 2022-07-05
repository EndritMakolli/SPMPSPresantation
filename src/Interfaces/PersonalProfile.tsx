import "../Style/PersonalProfile.css";
import { DataField } from "../Components/Common/DataField";
import { User } from "../Types/User";
import { dateParser } from "../utils";

interface Props {
  user: User;
}

export const PersonalProfile = ({ user }: Props) => {
  const parseAge = (): number => {
    let birthday = new Date(user.dateOfBirth);
    let currentDay = new Date();

    return currentDay.getFullYear() - birthday.getFullYear();
  };

  return (
    <>
      <h1 id="title">Profili personal</h1>
      <section className="contents" id="personalProfile">
        <div className="personalProfileBlock">
          <DataField
            label="Emri dhe mbiemri"
            contents={user?.firstName + " " + user?.surname}
          />
          <DataField label="Emri i prindit" contents={user!.parentName} />
          <DataField
            label="Ditëlindja"
            contents={dateParser(user.dateOfBirth)}
          />
          <DataField label="Mosha" contents={parseAge().toString()} />
          <DataField
            label="Numri i letërnjoftimit"
            contents={user!.personalNumber}
          />

          <DataField label="Gjinia" contents={user!.gender} />
        </div>

        <div className="personalProfileBlock">
          <img src={user!.profilePictureURL} alt="Fotoja e juaj" />
        </div>

        <div className="personalProfileBlock">
          <DataField label="Email adresa" contents={user!.email} />
          <DataField label="Numri i telefonit" contents={user!.phoneNumber} />
          <DataField label="Shteti" contents={user!.country.countryName} />
          <DataField label="Qyteti" contents={user!.city.cityName} />
          <DataField label="Adresa" contents={user!.addressDetails} />
          <DataField label="ZIP Kodi" contents={user!.city.zipCode} />
        </div>
      </section>
    </>
  );
};
