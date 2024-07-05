import Head from 'next/head';
import { Container, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Box, Collapse, TextField, Button } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { useState } from 'react';

const HelpPage = () => {
    const [openItems, setOpenItems] = useState([false, false, false, false]);
    const [issue, setIssue] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleToggle = (index) => {
        setOpenItems((prev) => {
            const newOpenItems = [...prev];
            newOpenItems[index] = !newOpenItems[index];
            return newOpenItems;
        });
    };

    const handleSubmitIssue = async (e) => {
        e.preventDefault();
        if (!issue.trim()) {
            return;
        }
        setSubmitting(true);

        try {
            // Here you can implement the logic to send the issue to your backend or service
            console.log('Submitting issue:', issue);
            // Example of clearing the issue text field after submission
            setIssue('');
            // Display success message or navigate to confirmation page
            alert('Issue submitted successfully!');
        } catch (error) {
            console.error('Error submitting issue:', error);
            // Display error message or handle error scenario
            alert('Failed to submit issue. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Head>
                <title>Help Center</title>
                <meta name="description" content="Get help and answers to frequently asked questions." />
            </Head>

            <Container maxWidth="md" sx={{ py: 8 }}>
                <Typography variant="h3" gutterBottom sx={{ color: '#37474F' }}>
                    Help Center
                </Typography>

                <Divider sx={{ mb: 4 }} />

                <List>
                    {[
                        {
                            question: "How do I create an account?",
                            answer: "To create an account, click on the 'Sign Up' button on the top right corner of the page. Fill out the required information and click 'Submit'."
                        },
                        {
                            question: "How can I reset my password?",
                            answer: "If you've forgotten your password, click on the 'Forgot Password' link on the login page. Enter your email address and follow the instructions sent to your email to reset your password."
                        },
                        {
                            question: "Can I track my orders?",
                            answer: "Yes, you can track your orders by logging into your account and navigating to the 'Orders' section. There you will find the status of your orders and any tracking information available."
                        },
                        {
                            question: "How do I contact customer support?",
                            answer: "If you have any questions or need assistance, you can contact our customer support team by emailing support@example.com or by calling 1-800-123-4567."
                        }
                    ].map((item, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{
                                mb: 2,
                                bgcolor: '#FFFFFF',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'translateY(-5px)' },
                            }}
                            onClick={() => handleToggle(index)}
                        >
                            <ListItemIcon>
                                <HelpIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.question}
                                secondary={
                                    <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
                                        <Box mt={1} sx={{ color: '#546E7A' }}>{item.answer}</Box>
                                    </Collapse>
                                }
                                primaryTypographyProps={{ color: 'textPrimary' }}
                                secondaryTypographyProps={{ color: 'textSecondary' }}
                            />
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h4" gutterBottom sx={{ color: '#37474F' }}>
                    Report an Issue
                </Typography>

                <form onSubmit={handleSubmitIssue}>
                    <TextField
                        label="Describe your issue"
                        variant="outlined"
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        required
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!issue.trim() || submitting}
                    >
                        {submitting ? 'Submitting...' : 'Submit Issue'}
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default HelpPage;
