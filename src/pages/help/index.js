// pages/HelpPage.js

import Head from 'next/head';
import { Container, Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

const HelpPage = () => {
    return (
        <div>
            <Head>
                <title>Help Center</title>
                <meta name="description" content="Get help and answers to frequently asked questions." />
            </Head>

            <Container maxWidth="md" sx={{ py: 8 }}>
                <Typography variant="h3" gutterBottom>
                    Help Center
                </Typography>

                <Divider sx={{ mb: 4 }} />

                <List>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="How do I create an account?"
                            secondary="To create an account, click on the 'Sign Up' button on the top right corner of the page. Fill out the required information and click 'Submit'."
                        />
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="How can I reset my password?"
                            secondary="If you've forgotten your password, click on the 'Forgot Password' link on the login page. Enter your email address and follow the instructions sent to your email to reset your password."
                        />
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Can I track my orders?"
                            secondary="Yes, you can track your orders by logging into your account and navigating to the 'Orders' section. There you will find the status of your orders and any tracking information available."
                        />
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="How do I contact customer support?"
                            secondary="If you have any questions or need assistance, you can contact our customer support team by emailing support@example.com or by calling 1-800-123-4567."
                        />
                    </ListItem>
                </List>
            </Container>
        </div>
    );
};

export default HelpPage;
