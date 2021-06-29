import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MDBDataTable } from "mdbreact";

const useStyles = makeStyles({
  mdbDataTable: {
    "& .row:nth-child(2)": {
      margin: "0.8rem 0rem",
      "& table": {
        borderCollapse: "collapse",
        borderRadius: "0.50rem",
        borderStyle: "hidden", /* hide standard table (collapsed) border */
        boxShadow: "0 0 0 1px #dee2e6" /* this draws the table border  */
      },
      "& th": {
       textAlign:"center"
      },
      "& td": {
        border: props => props.bordered && "1px solid #dee2e6!important",
        "& img": {
         height:"100px"
         },
      },
      "& div": {
        padding: "0px !important",
      },
    },
    "& .row:nth-child(3)": {
      "& div": {
       "& .dataTables_paginate": {
         cursor: "pointer",
       }
      }
    }
  },
});

export const MdbDataTable = (props) => {
  const classes = useStyles(props);
  return (
    <MDBDataTable
      striped
      noBottomColumns
      className={`${classes.mdbDataTable} table table-hover js-basic-example dataTable table-striped no-footer mb-0`}
      entriesOptions={[5, 10, 20, 25]}
      entries={5}
      paging
      pagesAmount={15}
      data={props.body}
      sortRows={["title"]}
      onPageChange={{ activePage: 2, pagesAmount: 5 }}
      searching={false}
     
    />
  );
};
