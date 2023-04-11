describe('Main page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.viewport('macbook-16')
        cy.get('#x-axis').clear().type('2')
        cy.get('#y-axis').clear().type('2')
        cy.get('#snakeBox').click()
        cy.get('#inputBox').clear().type('[0xff0000, 0x00ff00, 0x0000ff, 0xffff00]')
        cy.get('.submit').click()
    })

    it('Sets the pixel grid to the correct size', () => {
        cy.get('.pixel').should('have.length', 4)
    })

    it('Sets the pixels to the correct colour', () => {
        cy.get('.pixel').eq(0).should('have.css', 'background-color', 'rgb(255, 0, 0)')
        cy.get('.pixel').eq(1).should('have.css', 'background-color', 'rgb(0, 255, 0)')
        cy.get('.pixel').eq(2).should('have.css', 'background-color', 'rgb(0, 0, 255)')
        cy.get('.pixel').eq(3).should('have.css', 'background-color', 'rgb(255, 255, 0)')
        cy.get('.errorIcon').should('not.exist')
    })

    it('Accepts RGB value inputs', () => {
        cy.get('#inputBox').clear().type('[rgb(255, 0, 0), rgb(0, 255, 0), rgb(0, 0, 255), rgb(255, 255, 0)]')
        cy.get('.pixel').eq(0).should('have.css', 'background-color', 'rgb(255, 0, 0)')
        cy.get('.pixel').eq(1).should('have.css', 'background-color', 'rgb(0, 255, 0)')
        cy.get('.pixel').eq(2).should('have.css', 'background-color', 'rgb(0, 0, 255)')
        cy.get('.pixel').eq(3).should('have.css', 'background-color', 'rgb(255, 255, 0)')
    })

    it('Snakes the pixel grid when snake mode is enabled', () => {
        cy.get('#snakeBox').click()
        cy.get('.submit').click()
        cy.get('.pixel').eq(0).should('have.css', 'background-color', 'rgb(255, 0, 0)')
        cy.get('.pixel').eq(1).should('have.css', 'background-color', 'rgb(0, 255, 0)')
        cy.get('.pixel').eq(2).should('have.css', 'background-color', 'rgb(255, 255, 0)')
        cy.get('.pixel').eq(3).should('have.css', 'background-color', 'rgb(0, 0, 255)')
    })

    it('Displays an error icon on the correct pixel when it has an invalid colour', () => {
        cy.get('#inputBox').clear().type('[0xff0000, 0x00ff00, 0x0000ff, foobar]')
        cy.get('.submit').click()
        cy.get('.pixel').last().get('.errorIcon').should('exist')
    })
    
    it('Outputs correct error message when one or more pixel has an invalid color', () => {
        cy.get('#inputBox').clear().type('[0xff0000, 0x00ff00, 0x0000ff, foobar]')
        cy.get('.submit').click()
        cy.get('#errorMessage').should('contain.text', 'One or more pixels has an invalid colour.')
    })

    it('Outputs correct error message when the number of colours does not match the number of pixels', () => {
        cy.get('#inputBox').clear().type('[0xff0000, 0x00ff00, 0x0000ff]')
        cy.get('.submit').click()
        cy.get('#errorMessage').should('contain.text', 'The number of colours does not match the number of pixels.')
    })

    it('Outputs both error messages at the same time', () => {
        cy.get('#inputBox').clear().type('[0xff0000, 0x00ff00, foobar]')
        cy.get('.submit').click()
        cy.get('#errorMessage').should('contain.text', 'One or more pixels has an invalid colour.')
        cy.get('#errorMessage').should('contain.text', 'The number of colours does not match the number of pixels.')
    })

    it('Prints out the correct string to the output box', () => {
        cy.get('#outputBox').should('have.value', 
        `#include <avr/pgmspace.h>  // Needed to store stuff in Flash using PROGMEM
        #include "FastLED.h"       // Fastled library to control the LEDs

        // How many leds are connected?
        #define NUM_LEDS 256

        // Define the Data Pin
        #define DATA_PIN 7  // Connected to the data pin of the first LED strip

        // Define the array of leds
        CRGB leds[NUM_LEDS];

        // Create the array of retro arcade characters and store it in Flash memory
        const long Display[] PROGMEM =
        {
            0xff0000,0x00ff00,0x0000ff,0xffff00
        };
        void setup() { 
        FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
        FastLED.clear();
        for(int i = 0; i < NUM_LEDS; i++) {
            leds[i] = pgm_read_dword(&(Display[NUM_LEDS - i - 1]));
        }
        
        FastLED.show();
        }

        void loop() { 

        }`)
    })

    Cypress.Commands.add('assertValueCopiedToClipboard', value => {
        cy.window().then(win => {
            win.navigator.clipboard.readText().then(text => {
                expect(text).to.eq(value)
            })
        })
    })
    it('Copies the correct value to the clipboard', () => {
        cy.assertValueCopiedToClipboard(`#include <avr/pgmspace.h>  // Needed to store stuff in Flash using PROGMEM
        #include "FastLED.h"       // Fastled library to control the LEDs

        // How many leds are connected?
        #define NUM_LEDS 256

        // Define the Data Pin
        #define DATA_PIN 7  // Connected to the data pin of the first LED strip

        // Define the array of leds
        CRGB leds[NUM_LEDS];

        // Create the array of retro arcade characters and store it in Flash memory
        const long Display[] PROGMEM =
        {
            0xff0000,0x00ff00,0x0000ff,0xffff00
        };
        void setup() { 
        FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
        FastLED.clear();
        for(int i = 0; i < NUM_LEDS; i++) {
            leds[i] = pgm_read_dword(&(Display[NUM_LEDS - i - 1]));
        }
        
        FastLED.show();
        }

        void loop() { 

        }`)
    })
})

describe('Draw mode tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.viewport('macbook-16')
        cy.get('.drawModeLink').click()
        cy.get('#x-axis').clear().type('2')
        cy.get('#y-axis').clear().type('2')
        cy.get('#snakeBox').click()
        cy.get('.pixel').eq(0).click()
        cy.get('.bluePreset').click()
        cy.get('.pixel').eq(1).click()
        cy.get('.yellowPreset').click()
        cy.get('.pixel').eq(2).click()
        cy.get('.greenPreset').click()
        cy.get('.pixel').eq(3).click()
        cy.get('#submit').click()
    })

    it('Sets the grid to the correct size', () => {
        cy.get('.pixel').should('have.length', 4)
    })

    it('Colours in pixels with the correct colours', () => {
        cy.get('.pixel').eq(0).should('have.css', 'background-color', 'rgb(255, 0, 0)')
        cy.get('.pixel').eq(1).should('have.css', 'background-color', 'rgb(0, 0, 255)')
        cy.get('.pixel').eq(2).should('have.css', 'background-color', 'rgb(255, 255, 0)')
        cy.get('.pixel').eq(3).should('have.css', 'background-color', 'rgb(0, 255, 0)')
    })

    it('Can colour a pixel in multiple times', () => {
        cy.get('.bluePreset').click()
        cy.get('.pixel').first().click().should('have.css', 'background-color', 'rgb(0, 0, 255)')
        cy.get('.yellowPreset').click()
        cy.get('.pixel').first().click().should('have.css', 'background-color', 'rgb(255, 255, 0)')
        cy.get('.greenPreset').click()
        cy.get('.pixel').first().click().should('have.css', 'background-color', 'rgb(0, 255, 0)')
    })

    it('Can select and use a custom colour', () => {
        cy.get('#colorPicker').invoke('val', '#ffa500').trigger('change')
        cy.get('.customPreset').click()
        cy.get('.pixel').first().click().should('have.css', 'background-color', 'rgb(255, 165, 0)')
    })

    it('Outputs the correct colours', () => {
        cy.get('#outputBox').should('have.value', '[0xff0000,0x0000ff,0xffff00,0x00ff00]')
    })

    Cypress.Commands.add('assertValueCopiedToClipboard', value => {
        cy.window().then(win => {
            win.navigator.clipboard.readText().then(text => {
                expect(text).to.eq(value)
            })
        })
    })
    it('Copies the correct value to the clipboard', () => {
        cy.assertValueCopiedToClipboard('[0xff0000,0x0000ff,0xffff00,0x00ff00]')
    })

    it('Changes the output type to RGB when RGB mode is selected', () => {
        cy.get('#outputType').select('rgb')
        cy.get('#submit').click()
        cy.get('#outputBox').should('have.value', '[rgb(255, 0, 0),rgb(0, 0, 255),rgb(255, 255, 0),rgb(0, 255, 0)]')
    })

    it('Snakes the output when snake mode is selected', () => {
        cy.get('#snakeBox').click()
        cy.get('#submit').click()
        cy.get('#outputBox').should('have.value', '[0xff0000,0x0000ff,0x00ff00,0xffff00]')
    })

    it('Resets the grid when the reset button is clicked', () => {
        cy.get('#resetButton').click()
        cy.get('#submit').click()
        cy.get('.pixel').eq(0).should('have.css', 'background-color', 'rgb(0, 0, 0)')
        cy.get('.pixel').eq(1).should('have.css', 'background-color', 'rgb(0, 0, 0)')
        cy.get('.pixel').eq(2).should('have.css', 'background-color', 'rgb(0, 0, 0)')
        cy.get('.pixel').eq(3).should('have.css', 'background-color', 'rgb(0, 0, 0)')
        cy.get('#outputBox').should('have.value', '[0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000,0x000000]')
    })
})

describe('Front to back test', () => {
    Cypress.Commands.add('assertValueCopiedToClipboard', value => {
        cy.window().then(win => {
            win.navigator.clipboard.readText().then(text => {
                expect(text).to.eq(value)
            })
        })
    })
    it('Can perform a full front to back test', () => {
        cy.visit('http://localhost:5173/')
        cy.viewport('macbook-16')
        cy.get('.drawModeLink').click()
        cy.get('#x-axis').clear().type('2')
        cy.get('#y-axis').clear().type('2')
        cy.get('.redPreset').click()
        cy.get('.pixel').eq(0).click()
        cy.get('.bluePreset').click()
        cy.get('.pixel').eq(1).click()
        cy.get('.yellowPreset').click()
        cy.get('.pixel').eq(2).click()
        cy.get('.greenPreset').click()
        cy.get('.pixel').eq(3).click()
        cy.get('#submit').click()
        cy.get('.drawModeLink').click()
        // Still need to figure out how to paste clipboard contents
        cy.get('#inputBox').clear().type(setTimeout(async() => await navigator.clipboard.readText(), 3000))
        cy.get('#x-axis').clear().type('2')
        cy.get('#y-axis').clear().type('2')
        cy.get('#submit').click()
        cy.get('.pixel').eq(0).should('have.css', 'background-color', 'rgb(255, 0, 0)')
        cy.get('.pixel').eq(1).should('have.css', 'background-color', 'rgb(0, 255, 0)')
        cy.get('.pixel').eq(2).should('have.css', 'background-color', 'rgb(255, 255, 0)')
        cy.get('.pixel').eq(3).should('have.css', 'background-color', 'rgb(0, 0, 255)')
        cy.get('#outputBox').should('have.value', 
        `#include <avr/pgmspace.h>  // Needed to store stuff in Flash using PROGMEM
        #include "FastLED.h"       // Fastled library to control the LEDs

        // How many leds are connected?
        #define NUM_LEDS 256

        // Define the Data Pin
        #define DATA_PIN 7  // Connected to the data pin of the first LED strip

        // Define the array of leds
        CRGB leds[NUM_LEDS];

        // Create the array of retro arcade characters and store it in Flash memory
        const long Display[] PROGMEM =
        {
            0xff0000,0x000000,0x00ff00,0xffff00
        };
        void setup() { 
        FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
        FastLED.clear();
        for(int i = 0; i < NUM_LEDS; i++) {
            leds[i] = pgm_read_dword(&(Display[NUM_LEDS - i - 1]));
        }
        
        FastLED.show();
        }

        void loop() { 

        }`)
        cy.assertValueCopiedToClipboard(`#include <avr/pgmspace.h>  // Needed to store stuff in Flash using PROGMEM
        #include "FastLED.h"       // Fastled library to control the LEDs

        // How many leds are connected?
        #define NUM_LEDS 256

        // Define the Data Pin
        #define DATA_PIN 7  // Connected to the data pin of the first LED strip

        // Define the array of leds
        CRGB leds[NUM_LEDS];

        // Create the array of retro arcade characters and store it in Flash memory
        const long Display[] PROGMEM =
        {
            0xff0000,0x000000,0x00ff00,0xffff00
        };
        void setup() { 
        FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
        FastLED.clear();
        for(int i = 0; i < NUM_LEDS; i++) {
            leds[i] = pgm_read_dword(&(Display[NUM_LEDS - i - 1]));
        }
        
        FastLED.show();
        }

        void loop() { 

        }`)
    })
})