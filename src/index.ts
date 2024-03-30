import { EditorView } from '@codemirror/view';
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import {
  EditorExtensionRegistry,
  IEditorExtensionRegistry
} from '@jupyterlab/codemirror';
import { ITranslator, nullTranslator } from '@jupyterlab/translation';
import rainbowBrackets from 'rainbowbrackets';

const bracketLevels = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh'
] as const;
type BracketLevel = (typeof bracketLevels)[number];

type RanbowColors = {
  [key in BracketLevel]: string;
};

interface IRainbowSettings {
  light: RanbowColors;
  dark: RanbowColors;
}

type RanbowClasses = {
  [key in BracketLevel]: string;
};

const RAINBOW_CLASSES: RanbowClasses = {
  first: 'red',
  second: 'orange',
  third: 'yellow',
  fourth: 'yellow',
  fifth: 'blue',
  sixth: 'indigo',
  seventh: 'violet'
};

/**
 * Initialization data for the jupyterlab-rainbow-brackets extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-rainbow-brackets:plugin',
  description:
    'A JupyterLab extension adding rainbow brackets/parentheses to the editor.',
  autoStart: true,
  requires: [IEditorExtensionRegistry],
  optional: [ITranslator],
  activate: (
    app: JupyterFrontEnd,
    extensions: IEditorExtensionRegistry,
    translator: ITranslator | null
  ) => {
    const trans = (translator ?? nullTranslator).load(
      'jupyterlab-rainbow-brackets'
    );

    const defaultColors: IRainbowSettings = {
      light: {
        first: 'firebrick',
        second: 'darkorange',
        third: 'yellow',
        fourth: 'darkgreen',
        fifth: 'blue',
        sixth: 'indigo',
        seventh: 'darkviolet'
      },
      dark: {
        first: 'red',
        second: 'orange',
        third: 'lightyellow',
        fourth: 'lime',
        fifth: 'royalblue',
        sixth: 'darkorchid',
        seventh: 'violet'
      }
    };
    const colorsSchema = {
      first: {
        type: 'string',
        title: trans.__('First')
      },
      second: {
        type: 'string',
        title: trans.__('Second')
      },
      third: {
        type: 'string',
        title: trans.__('Third')
      },
      fourth: {
        type: 'string',
        title: trans.__('Fourth')
      },
      fifth: {
        type: 'string',
        title: trans.__('Fifth')
      },
      sixth: {
        type: 'string',
        title: trans.__('Sixth')
      },
      seventh: {
        type: 'string',
        title: trans.__('Seventh')
      }
    };

    // TODO: why `&light` and `&dark` does not work in JupyterLab?
    const lightSelector = '[data-jp-theme-light="true"] &';
    const darkSelector = '[data-jp-theme-light="false"] &';
    extensions.addExtension(
      Object.freeze({
        name: 'jupyterlab-rainbow-brackets',
        default: defaultColors,
        factory: () =>
          EditorExtensionRegistry.createConfigurableExtension(
            (settings: IRainbowSettings) => {
              const styles: Record<string, { color: string }> = {};
              for (const level of bracketLevels) {
                const rainbowClass =
                  '.rainbow-bracket-' + RAINBOW_CLASSES[level];
                styles[`${lightSelector} ${rainbowClass}`] = {
                  color: settings.light[level]
                };
                styles[`${lightSelector} ${rainbowClass} > span`] = {
                  color: settings.light[level]
                };
                styles[`${darkSelector} ${rainbowClass}`] = {
                  color: settings.dark[level]
                };
                styles[`${darkSelector} ${rainbowClass} > span`] = {
                  color: settings.dark[level]
                };
              }
              const plugins = rainbowBrackets();
              return [
                EditorView.theme(styles),
                plugins[0] // only take the plugin, not the theme
              ];
            }
          ),
        schema: {
          type: 'object',
          title: trans.__('Rainbow Bracket Colors'),
          description: trans.__('Overrides for the colors of the brackets'),
          properties: {
            light: {
              type: 'object',
              title: trans.__('In light theme'),
              properties: colorsSchema
            },
            dark: {
              type: 'object',
              title: trans.__('In dark theme'),
              properties: colorsSchema
            }
          }
        }
      })
    );
  }
};

export default plugin;
