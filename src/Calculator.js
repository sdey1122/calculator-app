// src/Calculator.js
import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import * as math from 'mathjs';

const Root = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(45deg, #FF6F91 30%, #FF9671 90%)',
});

const CalculatorContainer = styled(Paper)({
  padding: 16,
  backgroundColor: '#ffffff',
  borderRadius: '15px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

const Display = styled(Box)({
  backgroundColor: '#333',
  color: 'white',
  borderRadius: '5px',
  padding: 16,
  marginBottom: 16,
  textAlign: 'right',
  fontSize: '2.5rem',
  wordWrap: 'break-word',
});

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: '64px',
  minHeight: '64px',
  fontSize: '1.5rem',
  transition: 'background-color 0.3s',
}));

const PrimaryButton = styled(StyledButton)({
  backgroundColor: '#61dafb',
  '&:hover': {
    backgroundColor: '#21a1f1',
  },
});

const SecondaryButton = styled(StyledButton)({
  backgroundColor: '#282c34',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1b1f24',
  },
});

const FunctionButton = styled(StyledButton)({
  backgroundColor: '#f5a623',
  '&:hover': {
    backgroundColor: '#e6951d',
  },
});

const Calculator = () => {
  const [display, setDisplay] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setDisplay('');
    } else if (value === '=') {
      try {
        setDisplay(math.evaluate(display).toString());
      } catch {
        setDisplay('Error');
      }
    } else {
      setDisplay(display + value);
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C', 'sin(', 'cos(', 'tan(', 'log(', 'sqrt('],
  ];

  return (
    <Root>
      <Container maxWidth="sm">
        <CalculatorContainer elevation={3}>
          <Display>
            <Typography variant="h4">{display}</Typography>
          </Display>
          <Grid container spacing={2}>
            {buttons.flat().map((button, index) => (
              <Grid item xs={button === 'C' ? 4 : 2} key={index}>
                <StyledButton
                  variant="contained"
                  className={
                    ['=', 'C'].includes(button)
                      ? PrimaryButton
                      : /[+\-*/]/.test(button)
                      ? FunctionButton
                      : SecondaryButton
                  }
                  onClick={() => handleButtonClick(button)}
                >
                  {button}
                </StyledButton>
              </Grid>
            ))}
          </Grid>
        </CalculatorContainer>
      </Container>
    </Root>
  );
};

export default Calculator;
