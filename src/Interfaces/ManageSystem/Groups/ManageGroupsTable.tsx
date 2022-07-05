import { Group } from "../../../Types/Group";

interface Props {
  groups: Group[];
  onDetailsClick: (userId: string) => void;
}

export const ManageGroupsTable = ({ groups, onDetailsClick }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>IDja groupore</th>
          <th>Emri i grupit</th>
          <th>Sloti Kohor</th>
          <th>Operacionet</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => {
          return (
            <tr key={group.groupId}>
              <td>{group.groupId}</td>
              <td>{group.groupName}</td>
              <td>{group.timeSlot}</td>
              <td>
                <button onClick={() => onDetailsClick(group.groupId)}>
                  SHIKO DETAJET
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


