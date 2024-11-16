import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function SingleDatePicker({ value, onChange }) {
    return <StaticDatePicker slotProps={{ toolbar: { hidden: true } }} defaultValue={value} onChange={onChange} />;
}