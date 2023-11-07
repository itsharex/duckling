import { PostgreSQL, schemaCompletionSource, sql } from '@codemirror/lang-sql';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, IconButton, useTheme } from '@mui/material';
import { basicLight, vscodeDark } from '@uiw/codemirror-themes-all';
import CodeMirror, {
  ReactCodeMirrorRef,
  ViewUpdate,
} from '@uiw/react-codemirror';
import { useCallback, useEffect, useRef } from 'react';

import { ToolbarContainer } from '@/components/Toolbar';
import { useResize } from '@/hooks';
import classes from '@/hooks/resize.module.css';
import { usePageStore } from '@/stores/store';
import { useTabsStore } from '@/stores/tabs';
import { isDarkTheme } from '@/utils';

import DatasetItem from './DatasetItem';
import { sqlCompletions } from './complation';

const mySchema = { 'abc.table': ['id', 'name'] };
const sqlSnippets = PostgreSQL.language.data.of({
  autocomplete: [schemaCompletionSource({ schema: mySchema }), sqlCompletions],
});

export default function Editor() {
  const { table, refresh } = usePageStore();
  if (table === undefined) {
    return;
  }
  const id = table.id;
  const extra = table.extra;
  console.log('extra:', extra);
  const setStmt = useTabsStore((state) => state.setStmt);
  const docs = useTabsStore((state) => state.docs);
  const stmt = docs[id] ?? '';

  useEffect(() => {
    if (extra) {
      setStmt(id, `${stmt}\n${extra}`);
    }
  }, []);

  const onChange = useCallback((val: string, _viewUpdate: ViewUpdate) => {
    setStmt(id, val);
  }, []);

  const [targetRefTop, sizeTop, actionTop] = useResize(300, 'bottom');
  const refs = useRef<ReactCodeMirrorRef>({});
  useEffect(() => {
    if (refs.current?.view) console.log('EditorView:', refs.current?.view);
    if (refs.current?.state) console.log('EditorState:', refs.current?.state);
    if (refs.current?.editor)
      console.log('HTMLDivElement:', refs.current?.editor);
  }, [refs.current]);

  console.log(refs.current.state?.selection);
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: 'calc(100vh - 32px)',
        '& .cm-editor .cm-content': { fontFamily: 'Consolas' },
        '& *': { fontFamily: 'Consolas' },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box sx={{ height: '100%' }}>
        <ToolbarContainer>
          <IconButton
            size="small"
            sx={{
              color: 'green',
            }}
            onClick={async () => {
              if (refs.current?.view) {
                const view = refs.current.view;
                const selectedText = view.state.sliceDoc(
                  view.state.selection.main.from,
                  view.state.selection.main.to,
                );

                if (selectedText?.length > 0) {
                  await refresh(selectedText);
                } else if (stmt?.length > 0) {
                  await refresh(stmt);
                }
              }
            }}
          >
            <PlayArrowIcon fontSize="inherit" />
          </IconButton>
        </ToolbarContainer>
        <CodeMirror
          ref={refs}
          value={stmt}
          height={`calc(100vh - ${sizeTop + 64}px)`}
          extensions={[sql(), sqlSnippets]}
          theme={isDarkTheme(theme) ? vscodeDark : basicLight}
          onChange={onChange}
        />
      </Box>
      <Box
        ref={targetRefTop}
        className={classes.rightBottom}
        sx={{ height: sizeTop + 'px', width: '100%' }}
      >
        <div className={classes.controlsH}>
          <div className={classes.resizeHorizontal} onMouseDown={actionTop} />
        </div>
        <DatasetItem />
      </Box>
    </Box>
  );
}