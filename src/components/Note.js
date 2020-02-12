import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FaRegEdit, FaPlay, FaRegTrashAlt } from "react-icons/fa";
import { Predictions } from "aws-amplify";

import RecordingEditor from "./Recording-Editor";

const Note = styled("div")
`
  background-color: #fafaff;
  border-radius: 4px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(116, 180, 155, 0.2);
`;

const Title = styled("h2")
`
  color: #0b0863;
  margin-top: 0;
  margin-bottom: 8px;
`;

const Text = styled("p")
`
  color: #0b0863;
  margin-top: 0;
`;

const Icon = styled("button")
`
  padding: 8px 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #0b0863;
  border: none;
  cursor: pointer;
  flex: 1;
  background-color: #fafaff;

  &:hover {
    color: #fafaff;
    background-color: #0b0863;
  }
`;

const Divider = styled("div")
`
  height: 2px;
  background-color: #f4f9f4;
`;

const NoteActions = styled("div")
`
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  height: 50px;
  background-color: #0b0863;
`;

const Info = styled.div `
  padding: 24px;
`;

export default props => {
    const [showEditor, setShowEditor] = useState(false);

    const playAudio = async() => {
        const result = await Predictions.convert({
            textToSpeech: {
                source: {
                    text: props.text
                }
            }
        });

        const audioCtx = new AudioContext();
        const source = audioCtx.createBufferSource();

        audioCtx.decodeAudioData(
            result.audioStream,
            buffer => {
                source.buffer = buffer;
                source.connect(audioCtx.destination);
                source.start(0);
            },
            error => console.log(error)
        );
    };

    return ( <
        Note >
        <
        Info >
        <
        Title > { props.title } < /Title> <Text> {props.text} </Text > { " " } <
        /Info>{" "} <
        Divider / >
        <
        NoteActions >
        <
        Icon onClick = {
            () => playAudio() } >
        <
        FaPlay / >
        <
        /Icon>{" "} <
        Icon onClick = {
            () => setShowEditor(true) } >
        <
        FaRegEdit / >
        <
        /Icon>{" "} <
        Icon >
        <
        FaRegTrashAlt onClick = { props.onDelete }
        />{" "} <
        /Icon>{" "} <
        /NoteActions> {
            showEditor && ( <
                RecordingEditor title = { props.title }
                text = { props.text }
                onDismiss = {
                    () => {
                        setShowEditor(false);
                    }
                }
                onSave = { props.onSaveChanges }
                />
            )
        } { " " } <
        /Note>
    );
};