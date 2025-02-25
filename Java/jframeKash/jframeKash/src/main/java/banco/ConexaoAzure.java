package banco;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class ConexaoAzure {

    private JdbcTemplate connection;

    public ConexaoAzure() {

        BasicDataSource dataSource = new BasicDataSource();

        dataSource​.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

        dataSource​.setUrl("jdbc:sqlserver://kashmonitoramento.database.windows.net:1433;database=dbkashplus;user=kashplus@kashmonitoramento;password=1cco*grupo10;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;");


        this.connection = new JdbcTemplate(dataSource);

    }

    public JdbcTemplate getConexao() {
        return connection;
    }
}
