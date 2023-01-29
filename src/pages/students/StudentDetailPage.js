import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { sentenceCase } from 'change-case';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import {
    Avatar,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Stack
}
    from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import { getMarkApi, getStudent } from "../../services/userService";
import { FormAddMark } from "../../sections/@dashboard/user/markAdd";
import { getAllMark } from "../../features/marks/markSlice";
import "./loading.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: 500,
}));

export default function StudentDeTailPage() {
    const dispatch = useDispatch();
    const id = useParams().id;
    const marks = useSelector(state => state.marks);
    const [openAdd, setOpenAdd] = useState(false);
    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStudent(id).then((res) => {
            setStudent(res.data);
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        getMarkApi(id).then(res => {
            dispatch(getAllMark(res.data))
        })
    }, [])

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleClose = () => {
        setOpenAdd(false);

    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                {loading === false && student !== {} &&
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Item sx={{ boxShadow: 2 }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={student.image}
                                    sx={{ width: 200, height: 200, mx: 'auto', mt: 4, mb: 2, boxShadow: 2 }}
                                />
                                <Typography variant="h3" align="center" mb={2}>{student.studentName}</Typography>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" ml={4} mb={2} component="span">Student Id:</Typography>
                                    <Typography variant="body1" ml={2} mb={2} component="span" sx={{ fontStyle: 'italic' }}>{student.id}</Typography>
                                </Box>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" ml={4} mb={2} component="span">Date of birth:</Typography>
                                    <Typography variant="body1" ml={2} mb={2} component="span" sx={{ fontStyle: 'italic' }}>{student.dateOfBirth}</Typography>
                                </Box>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" ml={4} mb={2} component="span">Address:</Typography>
                                    <Typography variant="body1" ml={2} mb={2} component="span" sx={{ fontStyle: 'italic' }}>{student.address}</Typography>
                                </Box>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" ml={4} mb={2} component="span">Gender: </Typography>
                                    <Typography variant="body1" ml={2} mb={2} component="span" sx={{ fontStyle: 'italic' }}>{student.gender}</Typography>
                                </Box>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" ml={4} mb={2} component="span">Class: </Typography>
                                    <Typography variant="body1" ml={2} mb={2} component="span" sx={{ fontStyle: 'italic' }}>{student.studyClass.className}</Typography>
                                </Box>
                            </Item>

                        </Grid>
                        <Grid item xs={8}>
                            <Item sx={{ boxShadow: 2 }}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                    <Typography variant="h4" gutterBottom>
                                        Academic Transcript
                                    </Typography>
                                    <Button variant="contained" onClick={handleClickOpenAdd} startIcon={<Iconify icon="eva:plus-fill" />}>
                                        Add Mark
                                    </Button>
                                </Stack>

                                <Box>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Name of Subject </StyledTableCell>
                                                    <StyledTableCell align="center">Semester</StyledTableCell>
                                                    <StyledTableCell align="center">Year</StyledTableCell>
                                                    <StyledTableCell align="center">Mark</StyledTableCell>
                                                    <StyledTableCell align="center">Edit</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {marks.map((mark) => (
                                                    <StyledTableRow key={mark.id}>
                                                        <StyledTableCell component="th" scope="row">
                                                            {mark.subject.subjectName}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <Label color={(mark.semester === 'semester 1' && 'primary') || 'success'}>
                                                                {sentenceCase(mark.semester)}
                                                            </Label>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{mark.year}</StyledTableCell>
                                                        <StyledTableCell align="center">{mark.mark}</StyledTableCell>
                                                        <StyledTableCell align="center">{ }</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Item>
                        </Grid>

                    </Grid>
                }

                {
                    loading === true &&
                    <div className="col-sm-2">
                        <div id="dots5">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </div>
                    </div>
                }

            </Box>
            {/* dialog add newStudent */}
            <Dialog open={openAdd} onClose={handleClose} maxWidth="md">
                <DialogTitle>Add New Mark</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add mark to this website, please enter here.
                    </DialogContentText>
                    <FormAddMark />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}
