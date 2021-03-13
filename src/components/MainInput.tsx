import React, { useState, useEffect, useCallback } from 'react';
import queryString from "queryString";

import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import Web3 from "web3";

const useStylesInput = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        // margin: theme.spacing(0.1),
        width: '50vw',
      },
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
  }),
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

function InputTextField(props: TextFieldProps) {
  const classes = useStylesInput();

  return (
    <TextField
      InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  );
}

type MainInputProps = {
  web3: Web3
}

export default function MainInput(props: MainInputProps) {
  const {
    web3
  } = props;

  console.log(web3);

  const classes = useStyles();
  const [tx, setTx] = useState("");

  // const onSetTx = useCallback(
  //   newValue => {
  //     set
  //   }
  // )

  useEffect(() => {
    console.log(tx);
  }, [tx]);

  const onChangeHandler = (event: any) => {
    setTx(event.target.value);
  }

  return (
    <form className={classes.root} noValidate>
      <InputTextField
        label="TransactionID"
        className={classes.margin}
        type="text"
        value={tx}
        onChange={onChangeHandler}
        variant="filled"
        id="main-input"
      />
    </form>
  );
}
