import HorizontalNonLinearAlternativeLabelStepper from "components/Stepper";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import HistoryIcon from "@material-ui/icons/History";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import theme from "ColorTheme";
import { ThemeProvider } from "@material-ui/styles";
import SLTable from "components/SLTable";

export default function SmartLicense() {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="content">
      <ThemeProvider theme={theme}>
      <Paper square>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<AddIcon />} label="Create Smart License" />
          <Tab icon={<HistoryIcon />} label="History" />
        </Tabs>
      </Paper>
      <Box mt={5}>
      {value ? <SLTable/> : <HorizontalNonLinearAlternativeLabelStepper/>}
      </Box>
      </ThemeProvider>
    </div>
  );
}
