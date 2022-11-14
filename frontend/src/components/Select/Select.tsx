import React, { useId, useEffect, useRef, useState } from "react";
import { EmployeeActionKind } from "../../reducer";
import { StyledBox, StyledDownChevron, StyledLabel, StyledListContainer, StyledListItem, StyledTextDisplay, StyledUnorderedList } from "./Select.styles";

type SelectProps = {
  options: string[];
  values: string[] | number[];
  label?: string;
  withLabel?: boolean;
  onChange: (action: EmployeeActionKind, payload: string) => any;
  action: EmployeeActionKind;
}

export const Select = ({ options, label, values, withLabel = true, action, onChange }: SelectProps) => {
  const [show, setShow] = useState(false);

  // What is printed on the <p> tag
  const [selectedOption, setSelectedOption] = useState(options[0]);
  // What is currently selected or hovered when the list is open
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectRef = useRef<HTMLDivElement | null>(null)
  const id = useId();

  useEffect(() => {
    /**
     * If a number between 1 - 9 is pressed, select first entry which starts with the alphabet matching letter
     * @param eventKey 
     * @returns 
     */
    function handleDigitPress(eventKey: string) {
      const digits = /\d/;
      if (!digits.test(eventKey)) {
        return;
      }

      const key = 'abcdefghi'[Number(eventKey) - 1];
      const firstAppearance = options.findIndex(el => String(el)[0].toLowerCase() === key);
      if (firstAppearance !== -1) {
        !show && setSelectedOption(options[firstAppearance]);
        setSelectedIndex(firstAppearance);
      }
    }

    /**
     * When a character between a and z is pressed on the keyboard, find the first value starting with entered character and sets it as selection
     * @param eventKey - the entered single character
     * @returns 
     */
    function handleAlphabeticalNavigation(eventKey: string) {
      const alpha = /^[a-z]/;
      if (!alpha.test(eventKey)) {
        return;
      }

      const firstAppearance = options.findIndex(el => String(el)[0].toLowerCase() === eventKey);
      if (firstAppearance !== -1) {
        setSelectedIndex(firstAppearance);
        !show && setSelectedOption(options[firstAppearance]);
      }
    }

    /**
     * Pilot function for keyboard events with the custom select
     */
    function handleKeyDown(e: KeyboardEvent) {
      const isCurrentlyFocused = selectRef.current && document.activeElement === selectRef.current;

      if (e.key === "Tab") {
        return handleTab();
      }

      if (!isCurrentlyFocused) {
        return;
      }

      if (e.key === "ArrowDown" && selectedIndex < options.length - 1) {
        handleArrowNavigation(1);
      } else if (e.key === "ArrowUp" && selectedIndex > 0) {
        handleArrowNavigation(-1);
      } else if (e.key === " " || e.key === "Enter") {
        setShow(prev => !prev);
        show && setSelectedOption(options[selectedIndex]);
      } else if (e.key === "Escape" && show) {
        setSelectedIndex(options.findIndex(el => el === selectedOption));
        setShow(false);
      }

      handleAlphabeticalNavigation(e.key);
      handleDigitPress(e.key)
      return e.preventDefault();
    }

    function handleTab() {
      if (show) {
        setSelectedIndex(options.findIndex(el => el === selectedOption));
        setShow(false);
      }
    }

    function handleArrowNavigation(value: number) {
      setSelectedIndex(prev => prev + value);
      !show && setSelectedOption(options[selectedIndex + value]);
    }

    function handleCloseOnClickOutside(e: MouseEvent) {
      const isValidChild = selectRef.current?.contains((e.target as HTMLElement));
      if (!isValidChild) {
        setShow(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleCloseOnClickOutside)
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleCloseOnClickOutside);
    }
  }, [show, options, selectedOption, selectedIndex])

  useEffect(() => {
    onChange(action, selectedOption);
  }, [selectedOption, action, onChange]);

  return (
    <div>
      {withLabel && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledBox id={id} role="combobox" ref={selectRef} aria-expanded={show} aria-label={label} onClick={() => setShow(prev => !prev)} tabIndex={0}>
        <StyledTextDisplay role="textbox" aria-label={`selected option: ${selectedOption}`}>
          {selectedOption}
          <StyledDownChevron />
        </StyledTextDisplay>
        {show && (
          <StyledListContainer role="listbox" aria-expanded={show} aria-label="options list">
            <StyledUnorderedList>
              {options.map((option, index) => (
                <StyledListItem isCurrentSelected={(index === selectedIndex).toString()}
                  role="option"
                  aria-selected={selectedOption === option}
                  tabIndex={-1}
                  onMouseEnter={() => setSelectedIndex(index)}
                  key={`option-${option}-${id}`}
                  value={values[index]}
                  onClick={() => { setSelectedOption(options[index]); setSelectedIndex(index); }}
                >
                  {option}
                </StyledListItem>
              ))}
            </StyledUnorderedList>
          </StyledListContainer>
        )}
      </StyledBox>
    </div>
  )

}