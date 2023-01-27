import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import { FormAddStudent } from '../../sections/@dashboard/user/studentAdd';

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: theme.spacing(5, 0),
}));
export default function StudentAddPage() {
    return (
        <>
            <Helmet>
                <title> Student Manager </title>
            </Helmet>
            <Container maxWidth="sm">
                <StyledContent>
                    <Typography variant="h4" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                        Add Student
                    </Typography>
                    <FormAddStudent />
                </StyledContent>
            </Container>


        </>
    );
}