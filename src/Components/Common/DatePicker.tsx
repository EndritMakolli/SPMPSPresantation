import "../../Style/DatePicker.css";

interface DatePickerProps {
  info: string;
}

export const DatePicker = ({ info }: DatePickerProps) => {
  return (
    <div className="datePicker">
      <label htmlFor="startDate">Nga</label>
      <input type="date" name="startDate" />
      <label htmlFor="startDate">Deri</label>
      <input type="date" name="endDate" />
    </div>
  );
};
