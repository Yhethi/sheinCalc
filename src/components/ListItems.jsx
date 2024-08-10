import React, { useEffect, useState } from "react";
import '../css/listItem.css'

import gmail from "../assets/contact/gmail.png";
import whatsapp from "../assets/contact/whatsapp.png";
import excel from "../assets/contact/excel.png";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaRegTrashAlt } from "react-icons/fa";
import { TableFooter } from "@mui/material";

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';


const ListItems = ({saveItems, setSaveItems, setRows, rows, dataModified, sumaTotal, setSumaTotal, user, excelExported, setExcelExported}) => {

const [load, setLoad] = useState(false);

          const deleteProduct = (id)=>{
          let doSuma = 0;
          const newArray = saveItems.filter((item, index) => {
           
            return item.id !== id
          });
          newArray.forEach(element => {
            doSuma = doSuma + element.total;
            setSumaTotal(doSuma);
          });
          setSaveItems(newArray);
          setRows(newArray);
        }

        useEffect(() => {
          setTimeout(() => {
            setLoad(true);
          }, 1);
        }, [dataModified]);
        
          const exportToExcel = () => {
            setExcelExported(true);
            const parsingData = new Array;

            saveItems.forEach((el)=>{
              parsingData.push({
                Nº: el.id,
                Producto: el.name,
                Direccion_Shein: el.link,
                Valor: el.amount,
                Cantidad: el.cantidad,
                TotalProducto: el.total,
              });
            });

            parsingData.push({
              TotalProducto: 'T: $'+sumaTotal
            })

            const worksheet = XLSX.utils.json_to_sheet(parsingData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

            // Buffer to store the generated Excel file
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            let trimUser = user.replace(/ /g, "");
            
            saveAs(blob, "PedidoShein_"+trimUser+".xlsx");
        };

            return (
                <div className="tablaGlobal">
                  {load && (
                      <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            {/* <TableCell>#</TableCell> */}
                            <TableCell>Direccion URL SHEIN</TableCell>
                            <TableCell align="right">Cantidad</TableCell>
                            <TableCell align="right">Total $</TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              {/* <TableCell align="left">{row.id}</TableCell> */}
                              <TableCell component="th" scope="row"><a href={row.link} target="_blank">{row.link}</a></TableCell>
                              <TableCell align="right">{row.cantidad}</TableCell>
                              <TableCell align="right">${row.total}</TableCell>
                              <TableCell align="right"><FaRegTrashAlt onMouseUp={(e)=>{
                                deleteProduct(row.id)
                              }} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right"><h3>${sumaTotal}</h3></TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </TableContainer>
                  )}
                  <div className="d_flex text_message">
                    <p>Al crear el archivo, enviarlo por WhatsApp o por Correo Electronico presionando uno de los 2 botones correspondientes</p>
                  </div>
                  <div className="right sendFiles_buttons">
                    <button className="sendFile_button" target="_blank" onClick={exportToExcel}><img src={excel} alt={excel} /><p>Crear Excel</p></button>
                    {excelExported && 
                    (
                    <>
                      <a className="sendFile_button" target="_blank" href="https://wa.me/+584263039980"><img src={whatsapp} alt={whatsapp} /><p>Enviar por Wsp</p></a>
                      <a className="sendFile_button" target="_blank" href="mailto:josmar.coromoto@gmail.com?Subject=Hola%20quiero%20hacer%20este%20pedido"><img src={gmail} alt={gmail} /><p>Enviar por correo</p></a>
                    </>                  
                    )
                    }
                    </div>
                </div>
                )
            };

export default ListItems;
