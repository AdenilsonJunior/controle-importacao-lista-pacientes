import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useAuth } from "../../contexts/firebase_context";
import firebase from "firebase";

import {
  Layout,
  DropzoneWrapper,
  DropContainer,
  DropMessage,
  DroppedFileContainer,
  Name,
  Size,
  Header,
  Logout,
  Error,
} from "./styles";
import moment from "moment";

export default function Drop() {
  const [file, setFile] = useState();
  const [error, setError] = useState(null);

  const { logout } = useAuth();

  function renderDropMessage(isDragActive, isDragReject) {
    if (!isDragActive) {
      return <DropMessage>Arraste os arquivos aqui.</DropMessage>;
    }

    if (isDragReject) {
      return <DropMessage type="error">Arquivo não suportado.</DropMessage>;
    }

    return <DropMessage type="success">Solte um arquivo de texto.</DropMessage>;
  }

  function CSVToArray(strData, strDelimiter) {
    strDelimiter = strDelimiter || ",";

    var objPattern = new RegExp(
      "(\\" +
        strDelimiter +
        "|\\r?\\n|\\r|^)" +
        '(?:"([^"]*(?:""[^"]*)*)"|' +
        '([^"\\' +
        strDelimiter +
        "\\r\\n]*))",
      "gi"
    );

    var arrData = [[]];

    var arrMatches = null;

    while ((arrMatches = objPattern.exec(strData))) {
      var strMatchedDelimiter = arrMatches[1];
      if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
        arrData.push([]);
      }
      var strMatchedValue;
      if (arrMatches[2]) {
        strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
      } else {
        strMatchedValue = arrMatches[3];
      }
      arrData[arrData.length - 1].push(strMatchedValue);
    }

    return arrData;
  }

  let parsedCSV = {
    id: "",
    name: "",
    date: "",
    responsible: "",
    time: "",
    timestamp: 0,
  };
  let patients = [];

  let splited = [];

  function onDrop(files) {
    const reader = new FileReader();
    reader.readAsText(files[0]);
    setFile({ name: files[0].name, size: files[0].size });
    reader.onerror = (_) => {
      setError("Não foi possível ler esse arquivo");
    };
    reader.onload = async (e) => {
      const text = e.target?.result;
      processCSV(text);
    };
  }

  function processCSV(csv) {
    const arr = CSVToArray(csv, "\n");

    for (var i = 0; i < arr.length; i++) {
      splited.push(arr[i][0].split(","));
    }

    parsedCSV.id = splited[1][0];
    parsedCSV.name = parsedCSV.id.split(" ")[0];
    parsedCSV.date = splited[1][1];
    parsedCSV.timestamp = new Date(
      moment(parsedCSV.date, "DD-MM-YYYY")
    ).getTime();

    for (i = 2; i < splited.length; i++) {
      if (splited[i][0] === "Responsável") {
        parsedCSV.responsible = splited[i + 1][0];
        parsedCSV.time = splited[i + 1][1];
        break;
      }

      if (splited[i][0] === "Leito" || splited[i][0] === "") {
        continue;
      }

      patients.push({
        hospitalBed: splited[i][0],
        name: splited[i][1],
        sectionId: parsedCSV.id,
        cpf: splited[i][2],
        age: splited[i][3],
        lastDiet: splited[i][4],
        doctor: splited[i][5],
        entry: splited[i][6],
      });
    }

    try {
      var ref = firebase.database().ref(`/section/${parsedCSV.id}`);

      ref.get().then((snap) => {
        if (!snap.val()) {
          ref.set(parsedCSV);
        }
      });

      patients.forEach((patient) => {
        var cpf = patient.cpf;
        firebase
          .database()
          .ref(`/section/${parsedCSV.id}/patients/${cpf}`)
          .get()
          .then((snap) => {
            const patientCpf = snap.val();
            if (!patientCpf) {
              snap.ref.set(patient);
            }
          });
      });
    } catch (e) {
      setError("Não foi possível ler esse arquivo");
    }
  }

  return (
    <Layout>
      <Header>
        <Logout onClick={logout}>
          <img src="/images/logout.svg" alt="Sair" />
        </Logout>
      </Header>
      <DropzoneWrapper>
        <Dropzone accept="text/csv" onDropAccepted={onDrop}>
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <DropContainer
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              {renderDropMessage(isDragActive, isDragReject)}
            </DropContainer>
          )}
        </Dropzone>
        {file && (
          <DroppedFileContainer>
            <Name>
              {file.name} <br />
            </Name>
            <Size>{file.size}kb</Size>
          </DroppedFileContainer>
        )}
        {error && <Error>{error}</Error>}
      </DropzoneWrapper>
    </Layout>
  );
}
