import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ptBR } from "@mui/x-date-pickers/locales";
import "dayjs/locale/pt-br";

const CampoDataCadastro = ({ id, label, value, onChange, error }) => {
  const [internalDate, setInternalDate] = React.useState(value);

  React.useEffect(() => {
    setInternalDate(value);
  }, [value]);

  const handleDateChange = (date) => {
    setInternalDate(date);
    onChange(date);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="pt-br"
      localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
    >
        <DateTimePicker
          id={id}
          label={label}
          required
          margin="normal"
          value={internalDate}
          onChange={handleDateChange}
          error={error}
          sx={{ backgroundColor: "white", width: "100%" }}
        />
    </LocalizationProvider>
  );
};

export default CampoDataCadastro;
