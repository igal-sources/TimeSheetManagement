import React, { useState, useEffect } from "react";
import {
  DataGrid,
  Column,
  Editing,
  Pager,
  Paging,
  Scrolling,
  Button as DataGridButton,
  SearchPanel,
  Texts,
  LoadPanel,
  Toolbar,
  Item,
  Format,
  Selection,
} from "devextreme-react/data-grid";
import Button from "devextreme-react/button";
import { WorkingHourCard } from "../working-hour-card/WorkingHourCard";
import { useWorkingHoursData } from "services/custom-hooks/useWorkingHoursData";
import { formatMessage } from "devextreme/localization";
import { ActionType } from "global/enums";
import "./working-hour-list.scss";

export const WorkingHourList = () => {
  const isCancelled = React.useRef<boolean>(false);
  const { data, refetch } = useWorkingHoursData();
  const [selectedWorkingHoursId, setSelectedWorkingHoursId] = useState<number | undefined>();
  const [actionType, setActionType] = useState<ActionType | undefined>();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const onPopupClose = () => setIsPopupOpen(false);

  const initData = () => {};

  useEffect(() => {
    initData();

    return () => {
      isCancelled.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPopupConfirm = () => {
    refetch(() => {
      const modifiedValue = {};
      return modifiedValue;
    });
  };

  const handleDataGridRowSelected = ({ selectedRowsData }: any) => {
    if (selectedRowsData && selectedRowsData.length > 0) {
      const { workingHoursId = 0 } = selectedRowsData[0];
      setSelectedWorkingHoursId(workingHoursId);
      console.log("selectedRowsData-id:", selectedRowsData[0]);
    }
  };

  function populateSelected(workingHoursId: number) {
    setSelectedWorkingHoursId(workingHoursId);
    setActionType(ActionType.EDIT);
    setIsPopupOpen(true);
  }

  const onSelectedDocumentClick = (ev: any) => {
    const { workingHoursId = -1 } = ev.row.data || {};
    populateSelected(workingHoursId);
  };

  const onAddDocumentaButtonClick = () => {
    setActionType(ActionType.ADD);
    setIsPopupOpen(true);
    setSelectedWorkingHoursId(-1);
  };

  const onRowDblClick = ({ data }: any) => {
    const { workingHoursId = -1 } = data || {};
    populateSelected(workingHoursId);
  };

  return (
    <div id="working-hours-list" className="items-working-hours-list-container">
      {isPopupOpen === true ? (
        <WorkingHourCard
          documentId={selectedWorkingHoursId}
          closeCard={onPopupClose}
          confirmCard={onPopupConfirm}
          actionType={actionType}
        />
      ) : null}
      <DataGrid
        className="items-working-hours-list-data-grid"
        dataSource={data?.results}
        rtlEnabled={true}
        allowColumnReordering={true}
        columnAutoWidth={true}
        hoverStateEnabled={true}
        onSelectionChanged={handleDataGridRowSelected}
        showColumnLines={true}
        showRowLines={false}
        showBorders={true}
        rowAlternationEnabled={true}
        onRowDblClick={onRowDblClick}
        onKeyDown={(e: any) => {
          e.handled = e.event.key === "Enter";
        }}
      >
        <Selection mode="single" />
        <Column dataField="projectName" caption={formatMessage("TSM-WorkingHoursList-ProjectName")} />
        <Column dataField="workingDate" caption={formatMessage("TSM-WorkingHoursList-WorkingDate")} />
        <Column dataField="startTime" caption={formatMessage("TSM-WorkingHoursList-StartTime")} />
        <Column dataField="endTime" caption={formatMessage("TSM-WorkingHoursList-EndTime")} />
        <Column dataField="totalHours" caption={formatMessage("TSM-WorkingHoursList-TotalHours")}>
          <Format type="fixedPoint" precision={2} />
        </Column>
        <Column dataField="taskDescription" caption={formatMessage("TSM-WorkingHoursList-TaskDescription")} />
        <Column type="buttons">
          <DataGridButton name="edit" disabled={false} onClick={(ev: any) => onSelectedDocumentClick(ev)} />
        </Column>
        <SearchPanel
          visible={true}
          width={400}
          highlightCaseSensitive={true}
          placeholder={formatMessage("Search")}
        />
        <Toolbar>
          <Item location="center" name="searchPanel" />
          <Item location="center">
            <Button
              icon="add"
              type="default"
              disabled={false}
              text={formatMessage("Common-Add")}
              onClick={onAddDocumentaButtonClick}
            />
          </Item>
        </Toolbar>
        <LoadPanel enabled={true} />
        <Scrolling mode="virtual" rowRenderingMode="virtual" />
        {data && data.length > 10 && <Paging defaultPageSize={10} />}
        {data && data.length > 10 && (
          <Pager
            showPageSizeSelector={true}
            visible={true}
            allowedPageSizes={[5, 10, 20]}
            showInfo={true}
            infoText={formatMessage("dxPager-infoText")}
          />
        )}
        <Editing mode="row" allowUpdating={true} allowDeleting={true} useIcons={true} confirmDelete={true}>
          <Texts
            deleteRow={formatMessage("Remove")}
            editRow={formatMessage("Edit")}
            addRow={formatMessage("Add")}
            confirmDeleteMessage={formatMessage("ConfirmDeleteMessage")}
          />
        </Editing>
      </DataGrid>
    </div>
  );
};
