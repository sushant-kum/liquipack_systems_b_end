import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

import { setup as swagger_ui__setup, serve as swagger_ui__serve, SwaggerUiOptions } from 'swagger-ui-express';

const api_doc_base_path = 'public/api-doc';

const api_doc_renderer_path = api_doc_base_path;
const json_swagger_document_path = api_doc_base_path + '/liquipack-workflow-api-doc.json';
const yaml_swagger_document_path = api_doc_base_path + '/liquipack-workflow-api-doc.yaml';

router.use('/view', express.static(api_doc_renderer_path));

router.use('/view/swagger', swagger_ui__serve);

const swagger_ui_options: SwaggerUiOptions = {
  swaggerUrl: '/api-doc/download/json',
  isExplorer: true
};

router.get(
  '/view/swagger',
  swagger_ui__setup(
    undefined,
    swagger_ui_options,
    undefined,
    undefined,
    '/assets/images/favicon/favicon-96x96.png',
    undefined,
    'Liquipack Workflow - API Documentation'
  )
);

router.get('/download/yaml', (req: Request, res: Response) => {
  res.download(yaml_swagger_document_path);
});
router.get('/download/json', (req: Request, res: Response) => {
  res.download(json_swagger_document_path);
});

export { router };
