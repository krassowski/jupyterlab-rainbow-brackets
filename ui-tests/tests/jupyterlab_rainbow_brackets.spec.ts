import { expect, test } from '@jupyterlab/galata';

const brackets = `{
    {
        {
            [
                {
                    {
                        (
                            ()
                        )
                    }
                }
            ]
        }
    }
}`;

test('should add colors to braces/brackets/parens', async ({ page }) => {
  await page.notebook.createNew();
  page.notebook.setCell(0, 'code', brackets);

  const cell = await page.notebook.getCell(0);
  expect(await cell!.screenshot()).toMatchSnapshot('brackets-light-mode');
});
