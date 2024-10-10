import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledCodeBlock = styled.div`
  position: relative;
  margin: 1.5em 0;
`;

const CodeBlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2d2d2d;
  padding: 0.5rem 1rem;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const LanguageTag = styled.span`
  font-size: 12px;
  color: #ffffff;
  text-transform: uppercase;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #bbbbbb;
  }
`;

const Pre = styled.pre`
  margin: 0;
  padding: 1em;
  overflow: auto;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const EditablePre = styled.pre`
  margin: 0;
  padding: 1em;
  overflow: auto;
  outline: none;
  white-space: pre-wrap;
  word-break: keep-all;
  overflow-wrap: break-word;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

interface CodeBlockProps {
  language: string;
  value: string;
  isEditable: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value, isEditable }) => {
  const [code, setCode] = useState(value);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setCode(value);
  }, [value]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLPreElement>) => {
    setCode(e.currentTarget.textContent || '');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <StyledCodeBlock>
      <CodeBlockHeader>
        <LanguageTag>{language}</LanguageTag>
        <CopyButton onClick={copyToClipboard}>
          {isCopied ? '✓ Copied!' : '📋 Copy'}
        </CopyButton>
      </CodeBlockHeader>
      {isEditable ? (
        <EditablePre
          contentEditable
          onInput={handleCodeChange}
          suppressContentEditableWarning
          spellCheck="false"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      ) : (
        <Pre>
          <code className={`language-${language}`}>
            {code}
          </code>
        </Pre>
      )}
    </StyledCodeBlock>
  );
};

export default CodeBlock;