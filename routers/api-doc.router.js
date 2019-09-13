const router = require("express").Router();
const express = require("express");
const swagger_ui = require("swagger-ui-express");
const path = require("path");

const base_path = path.dirname(require.main.filename);

const api_doc_renderer_path = base_path + "/api-doc/public";
const json_swagger_document_path =
  base_path + "/api-doc/liquipack-workflow-api-doc.json";
const yaml_swagger_document_path =
  base_path + "/api-doc/liquipack-workflow-api-doc.yaml";
const json_swagger_document = require(json_swagger_document_path);

router.use("/view", express.static(api_doc_renderer_path));

router.use("/view/swagger", swagger_ui.serve);

router.get(
  "/view/swagger",
  swagger_ui.setup(
    json_swagger_document,
    null,
    null,
    null,
    "/assets/images/favicon/favicon-96x96.png",
    null,
    "Liquipack Workflow - API Documentation"
  )
);
router.get("/download/yaml", (req, res) => {
  res.download(yaml_swagger_document_path);
});
router.get("/download/json", (req, res) => {
  res.download(json_swagger_document_path);
});

module.exports = router;
