describe('Main page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.viewport('macbook-16')
        cy.get('#x-axis').clear().type('2')
        cy.get('#y-axis').clear().type('2')
        cy.get('#snakeBox').click()
        cy.get('#inputBox').clear().type('[0xff0000, 0x00ff00, 0x0000ff, 0xffff00]')
        cy.get('.submit').click()

        // Make browser accept clipboard permissions

        // cy.wrap(Cypress.automation('remote:debugger:protocol', {
        //     command: 'Browser.grantPermissions',
        //     params: {
        //         permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
        //         origin: window.location.origin
        //     }
        // }))
        // cy.window().its('navigator.permissions')
        //     .invoke('query', {name: 'clipboard-read'})
        //     .its('state').then(cy.log)
    })

    it('Sets the grid to the correct size', () => {
        cy.get('.pixel').should('have.length', 4)
    })

    it('Sets the pixels to the right colour', () => {
        cy.get('.pixel').eq(0).should('have.css', 'background-color', 'rgb(255, 0, 0)')
        cy.get('.pixel').eq(1).should('have.css', 'background-color', 'rgb(0, 255, 0)')
        cy.get('.pixel').eq(2).should('have.css', 'background-color', 'rgb(0, 0, 255)')
        cy.get('.pixel').eq(3).should('have.css', 'background-color', 'rgb(255, 255, 0)')
        cy.get('.errorIcon').should('not.exist')
    })

    it('Snakes the display grid when snake mode is enabled', () => {
        cy.get('#snakeBox').click()
        cy.get('.submit').click()
        cy.get('.pixel').eq(0).should('have.css', 'background-color', 'rgb(255, 0, 0)')
        cy.get('.pixel').eq(1).should('have.css', 'background-color', 'rgb(0, 255, 0)')
        cy.get('.pixel').eq(2).should('have.css', 'background-color', 'rgb(255, 255, 0)')
        cy.get('.pixel').eq(3).should('have.css', 'background-color', 'rgb(0, 0, 255)')
    })

    it('Outputs an error message when one or more pixel has an invalid color', () => {
        cy.get('#inputBox').clear().type('[0xff0000, 0x00ff00, 0x0000ff, foobar]')
        cy.get('.submit').click()
        cy.get('#errorMessage').should('have.text', 'One or more pixels has an invalid colour.')
    })

    it('Displays an error pixel on the correct pixel it has an invalid colour', () => {
        cy.get('#inputBox').clear().type('[0xff0000, 0x00ff00, 0x0000ff, foobar]')
        cy.get('.submit').click()
        cy.get('.pixel').last().get('.errorIcon').should('exist')
    })

    it('Outputs an error when the number of colours does not match the number of pixels', () => {
        cy.get('#inputBox').clear().type('[0xff0000, 0x00ff00, 0x0000ff]')
        cy.get('.submit').click()
        cy.get('#errorMessage').should('have.text', 'The number of colours does not match the number of pixels.')
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
    it('Copies the correct string to the clipboard', () => {
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