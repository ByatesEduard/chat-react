import React, { useContext, useMemo, useState } from 'react';
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import { addDoc, collection, orderBy, query, serverTimestamp } from "firebase/firestore";

const Chat = () => {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');
    const messagesQuery = useMemo(() => query(collection(firestore, 'messages'), orderBy('createdAt')), [firestore]);
    const [messagesSnapshot, loading] = useCollection(messagesQuery);
    const messages = useMemo(() => messagesSnapshot?.docs.map(d => ({ id: d.id, ...d.data() })) ?? [], [messagesSnapshot]);

    if (loading) {
        return <Loader/>
    }
    
    const sendMessage = async () => {
      if (!value.trim()) return;
      await addDoc(collection(firestore, 'messages'), {
        uid: user?.uid ?? null,
        displayName: user?.displayName ?? 'Anonymous',
        photoURL: user?.photoURL ?? null,
        text: value,
        createdAt: serverTimestamp(),
      });
      setValue('');
    };


    return (
        <Container>
            <Grid container
                  justifyContent={"center"}
                  style={{height: window.innerHeight - 50, marginTop: 20}}>
                <div style={{width: '80%', height: '60vh', border: '1px solid gray', overflowY: 'auto'}}>
                    {messages.map(message => (
                        <div key={message.id} style={{
                            margin: 10,
                            border: user?.uid === message.uid ? '2px solid green' : '2px dashed red',
                            marginLeft: user?.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: 5,
                        }}>
                            <Grid container>
                                <Avatar src={message.photoURL || undefined}/>
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    ))}
                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    style={{width: '80%'}}
                >
                    <TextField
                        fullWidth
                        maxRows={2}
                        multiline
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} variant={"outlined"}>Відправити</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;