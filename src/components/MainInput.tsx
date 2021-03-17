import React, { useState, useEffect, useCallback } from 'react';
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import Web3 from "web3";
import ENS, { getEnsAddress } from '@ensdomains/ensjs';
import { provider } from 'web3-core';

const ERC721ABI  = require("../ABIs/ERC721.json");

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

type ComponentProps = {
  componentProps: {
    web3: any
    // web3: provider // for ens
  }
}

export default function MainInput(props: ComponentProps) {
  const {
    web3
  } = props.componentProps;

  const classes = useStyles();
  const [tx, setTx] = useState("");
  const [owner, setOwner] = useState("");

  // const onSetTx = useCallback(
  //   newValue => {
  //     set
  //   }
  // )

  useEffect(() => {
    console.log(tx);
  }, [tx]);

  const onChangeHandler = async (event: any) => {
    setTx(event.target.value);

    try {
      // const contract = new web3.eth.Contract(ERC721ABI, event.target.value);
      // const owner = web3.eth.ens.getAddress(event.target.value);
      // setOwner(owner);

      const provider = web3.eth._provider; // todo is there a better way to get the provider from the web3 object?
      const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
      const test = await ens.name('vitalik.eth').getAddress(); // 0x123

      // const test = await web3.eth.getProof(address, storageKey, blockNumber, [callback])
      // const test = await web3.eth.getBlockNumber()

      // console.log(address)
      console.log(test)
    } catch (e) {
      console.error(e);
    }
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
