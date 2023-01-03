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
  Selection
} from "devextreme-react/data-grid";
import Button from "devextreme-react/button";
import { CustomerCard } from "../customer-card/CustomerCard";
import { useCustomersData } from "services/custom-hooks/useCustomersData";
import { formatMessage } from "devextreme/localization";
import { ActionType } from "global/enums";
import "./customer-list.scss";

export const CustomerList = () => {
  const { data, refetch } = useCustomersData();
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | undefined>();
  const [actionType, setActionType] = useState<ActionType | undefined>();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const onPopupClose = () => setIsPopupOpen(false);

  const initData = () => {};

  useEffect(() => {
    initData();

    return () => {
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
      const { customerId = 0 } = selectedRowsData[0];
      setSelectedCustomerId(customerId);
      console.log("selectedRowsData-id:", selectedRowsData[0]);
    }
  };

  function populateSelected(customerId: number) {
    setSelectedCustomerId(customerId);
    setActionType(ActionType.EDIT);
    setIsPopupOpen(true);
  }

  const onSelectedDocumentClick = (ev: any) => {
    const { customerId = -1 } = ev.row.data || {};
    populateSelected(customerId);
  };

  const onAddDocumentaButtonClick = () => {
    setActionType(ActionType.ADD);
    setIsPopupOpen(true);
    setSelectedCustomerId(-1);
  };

  const onRowDblClick = ({ data }: any) => {
    const { customerId = -1 } = data || {};
    populateSelected(customerId);
  };

  return (
    <div id="customer-list" className="customer-list-container">
      {isPopupOpen === true ? (
        <CustomerCard
          documentId={selectedCustomerId}
          closeCard={onPopupClose}
          confirmCard={onPopupConfirm}
          actionType={actionType}
        />
      ) : null}
      <DataGrid
        className="customer-list-data-grid"
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
        <Column dataField="customerName" caption={formatMessage("TSM-CustomersList-CustomerName")} />
        <Column dataField="contactName" caption={formatMessage("TSM-CustomersList-ContactName")} />
        <Column dataField="contactJobTitle" caption={formatMessage("TSM-CustomersList-ContactJobTitle")} />
        <Column dataField="address" caption={formatMessage("TSM-CustomersList-Address")} />
        <Column dataField="emailAddress" caption={formatMessage("TSM-CustomersList-EmailAddress")} />
        <Column dataField="phoneNumber" caption={formatMessage("TSM-CustomersList-PhoneNumber")} />
        <Column
          dataField="bookkeepingNumber"
          caption={formatMessage("TSM-CustomersList-BookkeepingNumber")}
        />
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
