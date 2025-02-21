import { useField } from 'formik';
import { Calendar } from 'primereact/calendar';
import { Message } from 'primereact/message';

interface Props {
    label: string;
    name: string;
    showIcon?: boolean;
    showTime?: boolean;
    timeOnly?: boolean;
    disabled?: boolean;
    dateFormat?: 'dd/mm/yy' | 'mm/dd/yy' | 'yy-mm-dd' | 'dd-mm-yy';
    [x: string]: any;
}

const FormDatePicker = ({ label, showIcon = true, showTime = false, timeOnly = false, disabled = false, dateFormat = 'dd-mm-yy', ...props }: Props) => {
    const [field, meta, helpers] = useField(props);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <Calendar
                id={props.name}
                value={field.value}
                onChange={(e) => helpers.setValue(e.value)}
                onBlur={field.onBlur}
                showIcon={showIcon}
                showTime={showTime}
                timeOnly={timeOnly}
                disabled={disabled}
                dateFormat={dateFormat}
                {...props}
            />
            {meta.touched && meta.error ? (
                <Message
                    id={`${props.name}-help`}
                    severity="error"
                    text={meta.error}
                    style={{ marginTop: '5px' }}
                />
            ) : null}
        </>
    );
}

export default FormDatePicker;
