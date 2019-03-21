import React from "react";
import Drawer from "@material-ui/core/Drawer";
import styled from "styled-components";

export default ({ widgetId }) => (
  <Drawer
    anchor="right"
    open={true}
    onClose={() => window.history.back()}
  >
    <StyledDrawerContent>
			Widget {widgetId} Info
		</StyledDrawerContent>
  </Drawer>
);


const StyledDrawerContent = styled.div`
	width: 500px;
`;