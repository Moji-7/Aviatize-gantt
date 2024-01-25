import React, { useCallback, useEffect } from "react";

import GSTC from "gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min.js";
import { Plugin as TimelinePointer } from "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js";
import { Plugin as Selection } from "gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js";
import { Plugin as ItemResizing } from "gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js";
import { Plugin as ItemMovement } from "gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js";

import "gantt-schedule-timeline-calendar/dist/style.css";
import "./styles/GantHome.css";

let gstc, state;

// helper functions

function generateRows() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Rows }
   */
  const rows = {};
  for (let i = 0; i < 100; i++) {
    const id = GSTC.api.GSTCID(i.toString());
    rows[id] = {
      id,
      label: `Row ${i}`,
    };
  }
  return rows;
}

function generateItems() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Items }
   */
  const items = {};
  // @ts-ignore
  let start = GSTC.api.date().startOf("day").subtract(6, "day");
  for (let i = 0; i < 100; i++) {
    const id = GSTC.api.GSTCID(i.toString());
    const rowId = GSTC.api.GSTCID(Math.floor(Math.random() * 100).toString());
    start = start.add(1, "day");
    items[id] = {
      id,
      label: `Item ${i}`,
      rowId,
      time: {
        start: start.valueOf(),
        end: start.add(1, "day").endOf("day").valueOf(),
      },
    };
  }
  return items;
}

function initializeGSTC(element) {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Config }
   */

  const config = {
    licenseKey:
      "====BEGIN LICENSE KEY====\nOIz6u4nUhLpVfkfnwkw7PjuAKH9x4qhNNVAa1+YLjjAmp6Knkq0CAG/76AVr/pX92yBtDAAanTfw909QJl5x8Ka3Nnhzgpv8NzYuT1YwIn2zUV49TOO5e3Quzx5N4R5GDKjCEs2d8/2i/bgh23Wvx5nBGnU/mgtDXlNCi8TMjXrj/TwcA6zA9vNzGAtHG+D7Q+ilxrSEJAzfYwKmpbOsNGfQvIGqgF8IwVLqWXaXOfppwVL+9X1APopYW55SoG0+GiC0RqtCV3gHaNm4R+kGvpvSHM+nAxUxvuXqzhOyfQD378iJFBKTGeNvJB62U1i9KoGXl47BHTb0/7eHomaH5A==||U2FsdGVkX18th2/1Je4nvGRpcxKZlCdK8TEjp/tWK/9Te+IyelShYNNWYVsoVNo7MIHTxuEMZLelYOuEx3WAy/zCZysMTKL7PMw2dyv/YWI=\negDREZYlduSw0vt8zGJ0agCDs7FXLqmNYANL6/JV/INg5qB6DwevysWyGRkKwVN+ztvE7M//jF659/d6CIDu/Rbpwhfcsb8PE+4pTRlB/tKQITehirFNUJTzajEavI1I/h2HZFob/AMU1lHeKaJ/ClV0opZPi6R+bZkc1rs+sCFRFIwu/F/mq16ABCD2Hoi9y+aFIE/YN3CmLRSVoiCV/KeEbJ2MkBkRd/YbAGSyCNev1czv/czrzo4sy/5SwyllZXXKjTc/RBDmr1bNpXUQJdGnBKc61Ssfv2OHvcmwoMe9HY+97ALcj3bkFEEBhOK28Tc5FOu0FDq7JvAEAgzMcA==\n====END LICENSE KEY====",
    plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
    list: {
      columns: {
        data: {
          [GSTC.api.GSTCID("id")]: {
            id: GSTC.api.GSTCID("id"),
            width: 60,
            data: ({ row }) => GSTC.api.sourceID(row.id),
            header: {
              content: "ID",
            },
          },
          [GSTC.api.GSTCID("label")]: {
            id: GSTC.api.GSTCID("label"),
            width: 200,
            data: "label",
            header: {
              content: "Label",
            },
          },
        },
      },
      rows: generateRows(),
    },
    chart: {
      items: generateItems(),
    },
  };

  state = GSTC.api.stateFromConfig(config);

  gstc = GSTC({
    element,
    state,
  });
}

function GantHome() {
  const callback = useCallback((element) => {
   // if (element)
     initializeGSTC(element);
  }, []);

  useEffect(() => {
    return () => {
      if (gstc) {
        gstc.destroy();
      }
    };
  });

  function updateFirstRow() {
    state.update(`config.list.rows.${GSTC.api.GSTCID("0")}`, (row) => {
      row.label = "Changed dynamically";
      return row;
    });
  }

  function changeZoomLevel() {
    state.update("config.chart.time.zoom", 21);
  }

  return (
    <>
   
      <div  className="gstc-wrapper"  ref={callback}></div>
      {/* <h2>ssl</h2> */}
</>

  );
}


export default GantHome;
