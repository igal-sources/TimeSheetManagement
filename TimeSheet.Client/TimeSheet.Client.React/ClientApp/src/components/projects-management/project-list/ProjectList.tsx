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
  Format,
  Summary,
  Toolbar,
  Item,
  Selection,
  GroupItem
} from "devextreme-react/data-grid";
import Button from "devextreme-react/button";
import { ProjectCard } from "../project-card/ProjectCard";
import { useProjectsData } from "services/custom-hooks/useProjectsData";
import { formatMessage } from "devextreme/localization";
import { ActionType } from "global/enums";
import "./project-list.scss";

export const ProjectList = () => {
  const isCancelled = React.useRef<boolean>(false);
  const { data, refetch } = useProjectsData();
  const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>();
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
      const { projectId = 0 } = selectedRowsData[0];
      setSelectedProjectId(projectId);
      console.log("selectedRowsData-id:", selectedRowsData[0]);
    }
  };

  function populateSelected(projectId: number) {
    setSelectedProjectId(projectId);
    setActionType(ActionType.EDIT);
    setIsPopupOpen(true);
  }

  const onSelectedDocumentClick = (ev: any) => {
    const { projectId = -1 } = ev.row.data || {};
    populateSelected(projectId);
  };

  const onAddDocumentaButtonClick = () => {
    setActionType(ActionType.ADD);
    setIsPopupOpen(true);
    setSelectedProjectId(-1);
  };

  const onRowDblClick = ({ data }: any) => {
    const { projectId = -1 } = data || {};
    populateSelected(projectId);
  };

  return (
    <div id="project-list" className="project-list-container">
      {isPopupOpen === true ? (
        <ProjectCard
          documentId={selectedProjectId}
          closeCard={onPopupClose}
          confirmCard={onPopupConfirm}
          actionType={actionType}
        />
      ) : null}
      <DataGrid
        className="project-list-data-grid"
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
        <Column dataField="customerName" caption={formatMessage("TSM-ProjectsList-CustomerName")} />
        <Column dataField="projectName" caption={formatMessage("TSM-ProjectsList-ProjectName")} />
        <Column dataField="hourlyRate" caption={formatMessage("TSM-ProjectsList-HourlyRate")}>
          <Format type="fixedPoint" precision={2} />
        </Column>
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
        <Summary>
          <GroupItem column="systemTableId" summaryType="count" displayFormat="{0}" />
        </Summary>
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
