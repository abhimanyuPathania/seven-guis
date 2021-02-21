import { Box } from '@chakra-ui/react';

import PageHeading from '../PageHeading/PageHeading';
import PageHeaderLink from '../PageHeaderLink/PageHeaderLink';
import Blockquote from '../Blockquote/Blockquote';
import * as shapes from '../../commons/shapes';

function PageHeader(props) {
  const { routeConfig, ...otherProps } = props;
  return (
    <Box mb="8" {...otherProps}>
      <PageHeading routeConfig={routeConfig} />
      <PageHeaderLink routeConfig={routeConfig} />
      <Blockquote cite={routeConfig.externalLink}>
        {routeConfig.citation}
      </Blockquote>
    </Box>
  );
}

PageHeader.propTypes = {
  routeConfig: shapes.routeConfig,
};

export default PageHeader;
